import express, { Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../models/User';

const router = express.Router();

// Extend Request interface to include user
interface AuthenticatedRequest extends Request {
  user: IUser;
}

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

// Interface for standard API response
interface ApiResponse {
  message: string;
  [key: string]: any;
}

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Get all providers/doulas
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: List of providers retrieved successfully
 */
router.get('/', async (req: Request, res: Response<ApiResponse>) => {
  res.status(501).json({
    message: 'Provider management endpoints to be implemented in Sprint 2-3'
  });
});

// TODO: Implement in Sprint 2-3
// - GET /providers - List all available doulas
// - GET /providers/:id - Get specific doula profile
// - PUT /providers/:id - Update doula profile (self-update)
// - GET /providers/:id/availability - Get doula availability
// - PUT /providers/:id/availability - Update doula availability

export default router;