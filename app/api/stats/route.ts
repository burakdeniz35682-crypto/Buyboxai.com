import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ProductLink from '@/lib/models/ProductLink';

export async function GET() {
  try {
    await connectDB();

    // Get total count of buybox products
    const totalCount = await ProductLink.countDocuments({ isBuyboxAvailable: true });

    // Get last scan time
    const lastProduct = await ProductLink.findOne().sort({ lastScannedAt: -1 });
    const lastScanTime = lastProduct?.lastScannedAt || new Date();

    return NextResponse.json({
      success: true,
      totalLinks: totalCount,
      lastScanTime: lastScanTime.toISOString(),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'İstatistikler alınamadı' },
      { status: 500 }
    );
  }
}
