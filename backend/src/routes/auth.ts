import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { body, validationResult, ValidationError } from 'express-validator';
import User from '@models/User';
import Client from '@models/Client';
import Provider from '@models/Provider';
import { sendEmail } from '@services/emailService';
import { generateTokens, verifyRefreshToken } from '@utils/tokenUtils';
import { 
  AuthenticatedRequest, 
  ApiResponse, 
  UserRole,
  JWTPayload 
} from '@types';

const router = express.Router();

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenRefreshRequest {
  refreshToken: string;
}

interface EmailVerificationRequest {
  token: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               role:
 *                 type: string
 *                 enum: [client, provider]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('role')
    .isIn(['client', 'provider'])
    .withMessage('Role must be either client or provider')
], async (req: Request<{}, ApiResponse, RegisterRequest>, res: Response<ApiResponse>, next: NextFunction): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array().reduce((acc: Record<string, string>, error: ValidationError) => {
          if (error.type === 'field') {
            acc[error.path] = error.msg;
          }
          return acc;
        }, {})
      });
      return;
    }

    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        error: 'User already exists',
        message: 'An account with this email address already exists'
      });
      return;
    }

    // Create email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      role,
      emailVerificationToken,
      emailVerificationExpires
    });

    await user.save();

    // Create role-specific profile
    try {
      if (role === 'client') {
        const clientProfile = new Client({
          userId: user._id
        });
        await clientProfile.save();
      } else if (role === 'provider') {
        const providerProfile = new Provider({
          userId: user._id
        });
        await providerProfile.save();
      }
    } catch (profileError) {
      console.error('Failed to create user profile:', profileError);
      // Rollback user creation
      await User.findByIdAndDelete(user._id);
      throw new Error('Failed to create user profile');
    }

    // Send verification email
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
      await sendEmail({
        to: user.email,
        subject: 'Welcome to LUNARA - Verify Your Email',
        template: 'welcome',
        data: {
          firstName: user.firstName,
          verificationUrl
        }
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to register user'
    });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials or unverified email
 *       500:
 *         description: Internal server error
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req: Request<{}, ApiResponse, LoginRequest>, res: Response<ApiResponse>, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array().reduce((acc: Record<string, string>, error: ValidationError) => {
          if (error.type === 'field') {
            acc[error.path] = error.msg;
          }
          return acc;
        }, {})
      });
      return;
    }

    passport.authenticate('local', { session: false }, async (err: Error | null, user: any, info: any): Promise<void> => {
      if (err) {
        res.status(500).json({
          success: false,
          error: 'Authentication error',
          message: err.message
        });
        return;
      }

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials',
          message: info?.message || 'Login failed'
        });
        return;
      }

      // Check if email is verified (unless OAuth user)
      if (!user.canLogin()) {
        res.status(401).json({
          success: false,
          error: 'Email not verified',
          message: 'Please verify your email address before logging in'
        });
        return;
      }

      try {
        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Save refresh token
        user.refreshTokens.push({ token: refreshToken });
        await user.save();

        res.json({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              isEmailVerified: user.isEmailVerified,
              lastLogin: user.lastLogin
            },
            accessToken,
            refreshToken
          }
        });
      } catch (updateError) {
        console.error('Failed to update user login info:', updateError);
        res.status(500).json({
          success: false,
          error: 'Login processing failed'
        });
      }

    })(req, res, next);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Login failed'
    });
  }
});

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to frontend with tokens
 */
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user;

      if (!user) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        return;
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Create role-specific profile if it doesn't exist
      if (user.role === 'client') {
        const existingClient = await Client.findOne({ userId: user._id });
        if (!existingClient) {
          const clientProfile = new Client({
            userId: user._id
          });
          await clientProfile.save();
        }
      } else if (user.role === 'provider') {
        const existingProvider = await Provider.findOne({ userId: user._id });
        if (!existingProvider) {
          const providerProfile = new Provider({
            userId: user._id
          });
          await providerProfile.save();
        }
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user);

      // Save refresh token
      user.refreshTokens.push({ token: refreshToken });
      await user.save();

      // Redirect to frontend with tokens (in production, use secure cookies)
      const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}&refresh=${refreshToken}`;
      res.redirect(redirectUrl);

    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }
  }
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 *       500:
 *         description: Internal server error
 */
router.post('/refresh', async (req: Request<{}, ApiResponse, TokenRefreshRequest>, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        error: 'Refresh token required'
      });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken) as JWTPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
      return;
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some((token: any) => token.token === refreshToken);
    if (!tokenExists) {
      res.status(401).json({
        success: false,
        error: 'Refresh token not found'
      });
      return;
    }

    // Generate new access token
    const { accessToken } = generateTokens(user);

    res.json({
      success: true,
      data: {
        accessToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and invalidate refresh token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.post('/logout', 
  passport.authenticate('jwt', { session: false }), 
  async (req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const user = req.user;

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
        return;
      }

      if (refreshToken) {
        // Remove the specific refresh token
        user.refreshTokens = user.refreshTokens.filter((token: any) => token.token !== refreshToken);
        await user.save();
      }

      res.json({
        success: true,
        message: 'Logout successful'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
  }
);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email address
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.post('/verify-email', async (req: Request<{}, ApiResponse, EmailVerificationRequest>, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        success: false,
        error: 'Token required'
      });
      return;
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
        message: 'Email verification token is invalid or has expired'
      });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed'
    });
  }
});

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], async (req: Request<{}, ApiResponse, ForgotPasswordRequest>, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    
    // Always return success for security (don't reveal if email exists)
    if (!user) {
      res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    await user.save();

    // Send password reset email
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await sendEmail({
        to: user.email,
        subject: 'LUNARA - Password Reset Request',
        template: 'password-reset',
        data: {
          firstName: user.firstName,
          resetUrl
        }
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process password reset request'
    });
  }
});

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password', [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
], async (req: Request<{}, ApiResponse, ResetPasswordRequest>, res: Response<ApiResponse>): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array().reduce((acc: Record<string, string>, error: ValidationError) => {
          if (error.type === 'field') {
            acc[error.path] = error.msg;
          }
          return acc;
        }, {})
      });
      return;
    }

    const { token, password } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
        message: 'Password reset token is invalid or has expired'
      });
      return;
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // Clear all refresh tokens for security
    user.refreshTokens = [];
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      error: 'Password reset failed'
    });
  }
});

export default router; 