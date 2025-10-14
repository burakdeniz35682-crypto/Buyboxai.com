import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Package from '@/lib/models/Package';

export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find({ isActive: true }).sort({ displayOrder: 1 });

    return NextResponse.json({
      success: true,
      packages: packages.map(pkg => ({
        id: pkg._id,
        name: pkg.name,
        price: pkg.price,
        categoryLimit: pkg.categoryLimit,
        features: pkg.features,
      })),
    });
  } catch (error) {
    console.error('Packages error:', error);
    return NextResponse.json(
      { error: 'Paketler alınamadı' },
      { status: 500 }
    );
  }
}
