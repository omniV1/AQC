import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  res.status(501).json({
    message: 'Resource management endpoints to be implemented in Sprint 3'
  });
});

// TODO: Implement in Sprint 3
// - GET /resources - List available resources
// - GET /resources/:id - Get specific resource
// - POST /resources - Create new resource (providers/admin)
// - PUT /resources/:id - Update resource
// - DELETE /resources/:id - Delete resource

export default router; 