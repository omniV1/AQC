import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointmentDocument extends Document {
  clientId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type?: 'virtual' | 'in_person';
  notes?: string;
}

export interface IAppointmentModel extends Model<IAppointmentDocument> {
  findByClient(clientId: mongoose.Types.ObjectId): Promise<IAppointmentDocument[]>;
  findByProvider(providerId: mongoose.Types.ObjectId): Promise<IAppointmentDocument[]>;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - clientId
 *         - providerId
 *         - startTime
 *         - endTime
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated appointment ID
 *         clientId:
 *           type: string
 *           description: Reference to the client user ID
 *         providerId:
 *           type: string
 *           description: Reference to the provider user ID
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled]
 *           default: scheduled
 *         type:
 *           type: string
 *           enum: [virtual, in_person]
 *         notes:
 *           type: string
 */

const appointmentSchema = new Schema<IAppointmentDocument>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['virtual', 'in_person'],
    default: 'virtual'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

appointmentSchema.static('findByClient', function(clientId: mongoose.Types.ObjectId) {
  return this.find({ clientId }).exec();
});

appointmentSchema.static('findByProvider', function(providerId: mongoose.Types.ObjectId) {
  return this.find({ providerId }).exec();
});

const Appointment = mongoose.model<IAppointmentDocument, IAppointmentModel>('Appointment', appointmentSchema);
export default Appointment; 