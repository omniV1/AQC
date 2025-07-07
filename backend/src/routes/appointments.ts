import express, { Router, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from '../types';
import { body, param, validationResult } from 'express-validator';
import Appointment from '../models/Appointment';

const router: Router = express.Router();

// Middleware to authenticate JWT token
const authenticate = passport.authenticate('jwt', { session: false });

// List appointments for authenticated user (client or provider)
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const role = req.user?.role;
    let appointments;
    if (role === 'provider') {
      appointments = await Appointment.find({ providerId: userId });
    } else {
      // default to client
      appointments = await Appointment.find({ clientId: userId });
    }
    return res.json(appointments);
  } catch (error) {
    console.error('List appointments error:', error);
    return res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});

// Get appointment by ID
router.get('/:id', authenticate, [
  param('id').isMongoId()
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid ID', details: errors.array() });
  }
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    return res.json(appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    return res.status(500).json({ error: 'Failed to retrieve appointment' });
  }
});

// Create new appointment
router.post('/', authenticate, [
  body('clientId').isMongoId(),
  body('providerId').isMongoId(),
  body('startTime').isISO8601(),
  body('endTime').isISO8601(),
  body('type').optional().isIn(['virtual', 'in_person'])
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    return res.status(201).json({ message: 'Appointment created', appointment });
  } catch (error) {
    console.error('Create appointment error:', error);
    return res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Update appointment
router.put('/:id', authenticate, [
  param('id').isMongoId(),
  body('status').optional().isIn(['scheduled', 'completed', 'cancelled']),
  body('startTime').optional().isISO8601(),
  body('endTime').optional().isISO8601(),
  body('notes').optional().isString()
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    return res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    console.error('Update appointment error:', error);
    return res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Delete appointment
router.delete('/:id', authenticate, [
  param('id').isMongoId()
], async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid ID', details: errors.array() });
  }
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    return res.json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

export default router; 