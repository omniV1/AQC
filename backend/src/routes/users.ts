import express, { Request, Response } from 'express';
import passport from 'passport';
const { body, validationResult } = require('express-validator');
import User, { IUser } from '../models/User';
import Client, { IClientDocument } from '../models/Client';
import Provider, { IProviderDocument } from '../models/Provider';

const router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

// Interface for profile update request body
interface ProfileUpdateBody {
  firstName?: string;
  lastName?: string;
  profile?: {
    phone?: string;
    timezone?: string;
    [key: string]: any;
  };
}

// Interface for profile response
interface ProfileResponse {
  user: IUser;
  profile: IClientDocument | IProviderDocument | null;
}

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60f7c2b8e1d2c8a1b8e1d2c8"
 *                     firstName:
 *                       type: string
 *                       example: "Jane"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "jane@example.com"
 *                     role:
 *                       type: string
 *                       example: "client"
 *                     isEmailVerified:
 *                       type: boolean
 *                       example: true
 *                 profile:
 *                   type: object
 *                   nullable: true
 *                   example: { "userId": "60f7c2b8e1d2c8a1b8e1d2c8", "status": "active" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.get('/profile', authenticate, async (req: Request, res: Response<ProfileResponse | { error: string }>) => {
  try {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Include role-specific profile
    let roleProfile: IClientDocument | IProviderDocument | null = null;
    const userId = user._id;
    if (user.role === 'client') {
      roleProfile = await Client.findOne({ userId });
    } else if (user.role === 'provider') {
      roleProfile = await Provider.findOne({ userId });
    }
    return res.json({
      user: user,
      profile: roleProfile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      error: 'Failed to retrieve profile'
    });
  }
});

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               profile:
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "+1-555-123-4567"
 *                   timezone:
 *                     type: string
 *                     example: "America/Phoenix"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60f7c2b8e1d2c8a1b8e1d2c8"
 *                     firstName:
 *                       type: string
 *                       example: "Jane"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "jane@example.com"
 *                     role:
 *                       type: string
 *                       example: "client"
 *                     isEmailVerified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Phone must be a valid mobile number"
 *                       param:
 *                         type: string
 *                         example: "profile.phone"
 *                       location:
 *                         type: string
 *                         example: "body"
 *                       value:
 *                         type: string
 *                         example: "notaphone"
 */
router.put('/profile', authenticate, [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }),
  body('profile.phone').optional().isMobilePhone('any')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updates = req.body;
    // Update allowed fields
    if (updates.firstName) user.firstName = updates.firstName;
    if (updates.lastName) user.lastName = updates.lastName;
    if (updates.profile) {
      user.profile = { ...user.profile, ...updates.profile };
    }
    await user.save();
    return res.json({
      message: 'Profile updated successfully',
      user: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      error: 'Failed to update profile'
    });
  }
});

// TODO: Additional user routes to be implemented in Sprint 2-3
// - Change password
// - Delete account
// - User preferences
// - Notification settings

export default router;