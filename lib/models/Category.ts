import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  platform: string;
  activeLinkCount: number;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    default: 'Trendyol',
  },
  activeLinkCount: {
    type: Number,
    default: 0,
  },
});

CategorySchema.index({ platform: 1 });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
