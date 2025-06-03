import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  res.status(501).json({
    message: 'Appointment management endpoints to be implemented in Sprint 3'
  });
});

// TODO: Implement in Sprint 3
// - GET /appointments - List user's appointments
// - POST /appointments - Create new appointment
// - GET /appointments/:id - Get specific appointment
// - PUT /appointments/:id - Update appointment
// - DELETE /appointments/:id - Cancel appointment

export default router; 