import crypto from 'crypto';
import User from '../models/User';
import Client from '../models/Client';
import Provider from '../models/Provider';
import { generateTokens } from '../utils/tokenUtils';
import { sendEmail } from './emailService';
import { ConflictError, NotFoundError, ValidationError, UnauthorizedError } from '../utils/errors';
import { Types } from 'mongoose';

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'client' | 'provider' | 'admin';
}

interface AuthResponse {
  message: string;
  user: any;
  accessToken?: string;
  refreshToken?: string;
}

interface LoginResponse {
  message: string;
  user: any;
  accessToken: string;
  refreshToken: string;
}

interface SanitizedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  lastLogin?: Date;
}

export class AuthService {
  /**
   * Register a new user with comprehensive validation
   */
  static async registerUser({ firstName, lastName, email, password, role }: RegisterUserData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('An account with this email address already exists');
    }

    // Create email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
    await this.createRoleSpecificProfile((user._id as Types.ObjectId).toString(), role);

    // Send verification email
    await this.sendVerificationEmail(user, emailVerificationToken);

    return {
      message: 'User registered successfully',
      user: this.sanitizeUserData(user)
    };
  }

  /**
   * Authenticate user login
   */
  static async loginUser(email: string, password: string): Promise<LoginResponse> {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check if user registered via OAuth and has no password
    if (!user.password) {
      throw new UnauthorizedError('Please sign in with your social account');
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check if email is verified
    if (!user.canLogin()) {
      throw new UnauthorizedError('Please verify your email address before logging in');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const tokens = generateTokens({
      _id: user._id as any as Types.ObjectId,
      email: user.email,
      role: user.role
    });

    // Save refresh token
    user.refreshTokens.push({ token: tokens.refreshToken, createdAt: new Date() });
    await user.save();

    return {
      message: 'Login successful',
      user: this.sanitizeUserData(user),
      ...tokens
    };
  }

  /**
   * Handle OAuth authentication
   */
  static async handleOAuthCallback(user: any): Promise<LoginResponse> {
    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Ensure role-specific profile exists
    await this.ensureRoleSpecificProfile(user._id, user.role);

    const tokens = generateTokens({
      _id: user._id as any as Types.ObjectId,
      email: user.email,
      role: user.role
    });

    // Save refresh token
    user.refreshTokens.push({ token: tokens.refreshToken, createdAt: new Date() });
    await user.save();

    return {
      message: 'OAuth login successful',
      user: this.sanitizeUserData(user),
      ...tokens
    };
  }

  /**
   * Refresh access token
   */
  static async refreshAccessToken(refreshToken: string, userId: string): Promise<{ accessToken: string }> {
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some((token: any) => token.token === refreshToken);
    if (!tokenExists) {
      throw new UnauthorizedError('Refresh token not found');
    }

    const tokens = generateTokens({
      _id: user._id as any as Types.ObjectId,
      email: user.email,
      role: user.role
    });

    return { accessToken: tokens.accessToken };
  }

  /**
   * Logout user and invalidate refresh token
   */
  static async logoutUser(userId: string, refreshToken?: string): Promise<{ message: string }> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (refreshToken) {
      user.refreshTokens = user.refreshTokens.filter((token: any) => token.token !== refreshToken);
      await user.save();
    }

    return { message: 'Logout successful' };
  }

  /**
   * Verify email address
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new ValidationError('Email verification token is invalid or has expired');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await User.findByEmail(email);
    
    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return { message: 'If an account with that email exists, a password reset link has been sent' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    await user.save();

    // Send password reset email
    await this.sendPasswordResetEmail(user, resetToken);

    return { message: 'If an account with that email exists, a password reset link has been sent' };
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new ValidationError('Password reset token is invalid or has expired');
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // Clear all refresh tokens for security
    user.refreshTokens = [];
    await user.save();

    return { message: 'Password reset successful' };
  }

  // Private helper methods
  private static async createRoleSpecificProfile(userId: string, role: string): Promise<void> {
    if (role === 'client') {
      const clientProfile = new Client({ userId });
      await clientProfile.save();
    } else if (role === 'provider') {
      const providerProfile = new Provider({ userId });
      await providerProfile.save();
    }
  }

  private static async ensureRoleSpecificProfile(userId: string, role: string): Promise<void> {
    if (role === 'client') {
      const existingClient = await Client.findOne({ userId });
      if (!existingClient) {
        const clientProfile = new Client({ userId });
        await clientProfile.save();
      }
    } else if (role === 'provider') {
      const existingProvider = await Provider.findOne({ userId });
      if (!existingProvider) {
        const providerProfile = new Provider({ userId });
        await providerProfile.save();
      }
    }
  }

  private static async sendVerificationEmail(user: any, token: string): Promise<void> {
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: 'Welcome to LUNARA - Verify Your Email',
        template: 'welcome',
        data: {
          firstName: user.firstName,
          verificationUrl
        }
      });
    } catch (error) {
      console.error('Failed to send verification email:', error);
      // Don't fail registration if email fails
    }
  }

  private static async sendPasswordResetEmail(user: any, token: string): Promise<void> {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: 'LUNARA - Password Reset Request',
        template: 'password-reset',
        data: {
          firstName: user.firstName,
          resetUrl
        }
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
    }
  }

  private static sanitizeUserData(user: any): SanitizedUser {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin
    };
  }
} 