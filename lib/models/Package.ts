import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  price: number;
  categoryLimit: number;
  features: string[];
  isActive: boolean;
  displayOrder: number;
}

const PackageSchema = new Schema<IPackage>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryLimit: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
