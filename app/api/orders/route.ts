import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import Package from '@/lib/models/Package';
import { generateOrderNumber, hashPassword, generateRandomPassword } from '@/lib/utils/auth';
import { sendEmail, getEmailTemplate } from '@/lib/email/emailService';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, packageId, selectedCategories, customerInfo } = await request.json();

    // Get package details
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return NextResponse.json({ error: 'Paket bulunamadı' }, { status: 404 });
    }

    // Validate category selection
    if (selectedCategories.length !== packageData.categoryLimit) {
      return NextResponse.json(
        { error: `${packageData.categoryLimit} kategori seçmelisiniz` },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order
    await Order.create({
      orderNumber,
      userEmail: email,
      packageId,
      selectedCategories,
      totalAmount: packageData.price,
      status: 'Beklemede',
      customerInfo,
    });

    // Check if user exists, if not create one
    let user = await User.findOne({ email });
    let tempPassword = '';
    
    if (!user) {
      tempPassword = generateRandomPassword();
      const hashedPassword = await hashPassword(tempPassword);
      
      user = await User.create({
        email,
        password: hashedPassword,
        name: customerInfo.name,
        phone: customerInfo.phone,
        roles: ['user'],
      });

      // Send account creation email
      await sendEmail({
        to: email,
        subject: 'buyboxtr\'ye Hoş Geldiniz! İşte Komuta Merkezi Giriş Bilgileriniz!',
        html: getEmailTemplate('account_created', {
          email,
          password: tempPassword,
        }),
      });
    }

    // Send order received email
    await sendEmail({
      to: email,
      subject: `Siparişiniz Alındı! | buyboxtr | Sipariş No: ${orderNumber}`,
      html: getEmailTemplate('order_received', {
        orderNumber,
        packageName: packageData.name,
        amount: packageData.price,
      }),
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      message: 'Siparişiniz başarıyla oluşturuldu',
      accountCreated: !!tempPassword,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Sipariş oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get user email from query or auth token
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ error: 'E-posta gerekli' }, { status: 400 });
    }

    const orders = await Order.find({ userEmail })
      .populate('packageId')
      .populate('selectedCategories')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Siparişler alınamadı' },
      { status: 500 }
    );
  }
}
