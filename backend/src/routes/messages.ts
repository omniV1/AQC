import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';
import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Message from '../models/Message';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

// List conversations (distinct conversationIds) for authenticated user
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const conversations = await Message.aggregate([
      { $match: { $or: [ { sender: userId }, { receiver: userId } ] } },
      { $group: { _id: '$conversationId', lastMessage: { $last: '$$ROOT' } } },
      { $sort: { 'lastMessage.createdAt': -1 } }
    ]);
    return res.json(conversations);
  } catch (error) {
    console.error('List conversations error:', error);
    return res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
});

// Get messages in a conversation
router.get('/:conversationId', authenticate, [
  param('conversationId').isMongoId()
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid ID', details: errors.array() });
  }
  try {
    const messages = await Message.findConversation(req.params.conversationId as any);
    return res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    return res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Send a new message (creates conversation if first message)
router.post('/', authenticate, [
  body('conversationId').optional().isMongoId(),
  body('receiver').isMongoId(),
  body('content').isString().notEmpty(),
  body('type').optional().isIn(['text', 'image', 'file', 'system'])
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  try {
    const messageData = {
      conversationId: req.body.conversationId || new mongoose.Types.ObjectId(),
      sender: req.user?._id,
      receiver: req.body.receiver,
      content: req.body.content,
      type: req.body.type || 'text',
      read: false
    };
    const message = new Message(messageData);
    await message.save();
    // TODO: Emit through Socket.io as well if needed
    return res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    console.error('Send message error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// Mark message as read
router.put('/:id/read', authenticate, [
  param('id').isMongoId()
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid ID', details: errors.array() });
  }
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    console.error('Mark read error:', error);
    return res.status(500).json({ error: 'Failed to update message' });
  }
});

export default router; 