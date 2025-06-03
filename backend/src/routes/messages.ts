import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  res.status(501).json({
    message: 'Messaging endpoints to be implemented in Sprint 3'
  });
});

// TODO: Implement in Sprint 3
// - GET /messages - List user's conversations
// - POST /messages - Send new message
// - GET /messages/:conversationId - Get conversation messages
// - PUT /messages/:id/read - Mark message as read

export default router; 