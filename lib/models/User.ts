import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  demoAttemptCount: number;
  roles: ('admin' | 'user')[];
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
  },
  demoAttemptCount: {
    type: Number,
    default: 0,
  },
  roles: {
    type: [String],
    enum: ['admin', 'user'],
    default: ['user'],
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
