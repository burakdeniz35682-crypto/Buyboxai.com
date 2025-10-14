import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Package from '@/lib/models/Package';
import { verifyToken } from '@/lib/utils/auth';

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
    const { name, price, categoryLimit, features, isActive } = body;

    await dbConnect();

    const pkg = await Package.findById(id);

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: 'Paket bulunamadı' },
        { status: 404 }
      );
    }

    if (name) pkg.name = name;
    if (price !== undefined) pkg.price = price;
    if (categoryLimit !== undefined) pkg.categoryLimit = categoryLimit;
    if (features) pkg.features = features.filter((f: string) => f.trim() !== '');
    if (isActive !== undefined) pkg.isActive = isActive;

    await pkg.save();

    return NextResponse.json({
      success: true,
      package: pkg,
    });
  } catch (error) {
    console.error('Package update error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
