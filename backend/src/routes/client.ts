import express, { Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../models/User';

const router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

// Interface for standard API response
interface ApiResponse {
  message: string;
  [key: string]: any;
}

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients (doulas only)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully
 */
router.get('/', authenticate, async (req: Request, res: Response<ApiResponse>) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.status(501).json({
    message: 'Client management endpoints to be implemented in Sprint 2-3'
  });
});

// TODO: Implement in Sprint 2-3
// - GET /clients - List all clients for doula
// - GET /clients/:id - Get specific client details
// - PUT /clients/:id - Update client information
// - POST /clients/:id/intake - Submit/update intake form
// - GET /clients/:id/progress - Get client progress metrics

export default router;