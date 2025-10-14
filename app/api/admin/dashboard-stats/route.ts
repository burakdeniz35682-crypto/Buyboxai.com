import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import DemoRequest from '@/lib/models/DemoRequest';
import { verifyToken } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
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

    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's stats
    const todayOrders = await Order.find({
      createdAt: { $gte: today },
    }).populate('packageId');

    const todaySales = todayOrders.length;
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Get pending orders count
    const pendingOrders = await Order.countDocuments({ status: 'Beklemede' });

    // Get total stats
    const totalOrders = await Order.countDocuments();
    const allOrders = await Order.find();
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Get recent demo requests (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentDemoRequests = await DemoRequest.countDocuments({
      requestedAt: { $gte: weekAgo },
    });

    return NextResponse.json({
      success: true,
      stats: {
        todaySales,
        todayRevenue,
        pendingOrders,
        totalOrders,
        totalRevenue,
        recentDemoRequests,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
