import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
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

    const demoRequests = await DemoRequest.find().sort({ requestedAt: -1 });

    return NextResponse.json({
      success: true,
      demoRequests,
    });
  } catch (error) {
    console.error('Admin demo requests error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
