import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import { verifyToken } from '@/lib/utils/auth';
import { sendOrderStatusEmail } from '@/lib/email/emailService';
import { generateExcelForOrder } from '@/lib/utils/excelGenerator';

export async function PUT(
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
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Durum gereklidir' },
        { status: 400 }
      );
    }

    await dbConnect();

    const order = await Order.findById(id).populate('packageId').populate('selectedCategories');

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Sipariş bulunamadı' },
        { status: 404 }
      );
    }

    const oldStatus = order.status;
    order.status = status;
    await order.save();

    // Send appropriate email based on status change
    if (status === 'Ödendi' && oldStatus !== 'Ödendi') {
      // Send payment confirmed email
      await sendOrderStatusEmail(order, 'payment-confirmed');
      
      // Automatically trigger delivery process
      setTimeout(async () => {
        try {
          // Generate and send Excel
          await generateExcelForOrder(order);
          order.status = 'Teslim Edildi';
          await order.save();
          await sendOrderStatusEmail(order, 'delivered');
        } catch (error) {
          console.error('Auto-delivery error:', error);
        }
      }, 1000); // 1 second delay to simulate processing
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
