import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  res.status(501).json({
    message: 'Check-in endpoints to be implemented in Sprint 3'
  });
});

// TODO: Implement in Sprint 3
// - GET /checkins - List user's check-ins
// - POST /checkins - Submit new check-in
// - GET /checkins/:id - Get specific check-in
// - GET /checkins/analytics - Get check-in analytics/trends

export default router; 