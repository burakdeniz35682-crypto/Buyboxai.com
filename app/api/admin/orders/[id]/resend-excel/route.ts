import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import { verifyToken } from '@/lib/utils/auth';
import { generateExcelForOrder } from '@/lib/utils/excelGenerator';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || !Array.isArray(decoded.roles) || !decoded.roles.includes('admin')) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const order = await Order.findById(id).populate('packageId').populate('selectedCategories');

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Sipariş bulunamadı' },
        { status: 404 }
      );
    }

    // Regenerate and send Excel
    await generateExcelForOrder(order);

    return NextResponse.json({
      success: true,
      message: 'Excel dosyası tekrar gönderildi',
    });
  } catch (error) {
    console.error('Resend excel error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
