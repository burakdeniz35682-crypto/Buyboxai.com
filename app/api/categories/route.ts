import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({ platform: 'Trendyol' }).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      categories: categories.map(cat => ({
        id: cat._id,
        name: cat.name,
        activeLinkCount: cat.activeLinkCount,
        platform: cat.platform,
      })),
    });
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json(
      { error: 'Kategoriler alınamadı' },
      { status: 500 }
    );
  }
}
