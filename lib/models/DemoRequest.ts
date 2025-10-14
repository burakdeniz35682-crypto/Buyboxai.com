import mongoose, { Schema, Document } from 'mongoose';

export interface IDemoRequest extends Document {
  email: string;
  ipAddress: string;
  browserFingerprint: string;
  requestedAt: Date;
  isDelivered: boolean;
}

const DemoRequestSchema = new Schema<IDemoRequest>({
  email: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  browserFingerprint: {
    type: String,
    required: true,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

DemoRequestSchema.index({ email: 1 });
DemoRequestSchema.index({ ipAddress: 1 });
DemoRequestSchema.index({ browserFingerprint: 1 });

export default mongoose.models.DemoRequest || mongoose.model<IDemoRequest>('DemoRequest', DemoRequestSchema);
