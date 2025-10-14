import mongoose, { Schema, Document } from 'mongoose';

export interface IProductLink extends Document {
  url: string;
  category: string;
  platform: string;
  lastScannedAt: Date;
  isBuyboxAvailable: boolean;
  price?: number;
  sellerCount?: number;
}

const ProductLinkSchema = new Schema<IProductLink>({
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    default: 'Trendyol',
  },
  lastScannedAt: {
    type: Date,
    default: Date.now,
  },
  isBuyboxAvailable: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
  },
  sellerCount: {
    type: Number,
  },
});

ProductLinkSchema.index({ category: 1, isBuyboxAvailable: 1 });

export default mongoose.models.ProductLink || mongoose.model<IProductLink>('ProductLink', ProductLinkSchema);
