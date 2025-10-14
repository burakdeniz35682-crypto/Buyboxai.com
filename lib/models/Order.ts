import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  userEmail: string;
  packageId: mongoose.Types.ObjectId;
  selectedCategories: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: 'Beklemede' | 'Ödendi' | 'Teslim Edildi' | 'İptal Edildi';
  paymentProofUrl?: string;
  customerInfo: {
    name: string;
    phone: string;
    companyName?: string;
    taxOffice?: string;
    taxNumber?: string;
    address?: string;
    city?: string;
    district?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  packageId: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  selectedCategories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Beklemede', 'Ödendi', 'Teslim Edildi', 'İptal Edildi'],
    default: 'Beklemede',
  },
  paymentProofUrl: {
    type: String,
  },
  customerInfo: {
    name: String,
    phone: String,
    companyName: String,
    taxOffice: String,
    taxNumber: String,
    address: String,
    city: String,
    district: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
