import express, { Router, Request, Response } from 'express';
import passport from 'passport';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', async (req: Request, res: Response) => {
  res.status(501).json({
    message: 'Blog endpoints to be implemented in Sprint 3'
  });
});

// TODO: Implement in Sprint 3
// - GET /blog - List blog posts
// - GET /blog/:slug - Get specific blog post
// - POST /blog - Create new blog post (providers/admin)
// - PUT /blog/:id - Update blog post
// - DELETE /blog/:id - Delete blog post

export default router; 