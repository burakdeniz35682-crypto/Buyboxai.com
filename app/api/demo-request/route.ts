import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DemoRequest from '@/lib/models/DemoRequest';
import ProductLink from '@/lib/models/ProductLink';
import Category from '@/lib/models/Category';
import { sendEmail, getEmailTemplate } from '@/lib/email/emailService';
import { generateExcelFile } from '@/lib/utils/excelGenerator';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Generate browser fingerprint (simple version)
    const userAgent = request.headers.get('user-agent') || '';
    const browserFingerprint = crypto.createHash('md5').update(userAgent).digest('hex');

    // Check if demo was already requested
    const existingRequest = await DemoRequest.findOne({
      $or: [
        { email },
        { ipAddress },
        { browserFingerprint },
      ],
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: 'Bu mail adresi/IP/tarayıcı ile daha önce demo talep edildi. Fırsat sadece bir kere sunulur!' },
        { status: 400 }
      );
    }

    // Get 10 random categories
    const categories = await Category.aggregate([
      { $match: { platform: 'Trendyol', activeLinkCount: { $gt: 0 } } },
      { $sample: { size: 10 } },
    ]);

    if (categories.length === 0) {
      return NextResponse.json(
        { error: 'Şu anda demo verileri mevcut değil' },
        { status: 503 }
      );
    }

    // Get random products from each category
    const products = [];
    for (const category of categories) {
      const categoryProducts = await ProductLink.aggregate([
        {
          $match: {
            category: category.name,
            isBuyboxAvailable: true,
          },
        },
        { $sample: { size: 5 } },
      ]);
      products.push(...categoryProducts);
    }

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Şu anda demo ürünleri mevcut değil' },
        { status: 503 }
      );
    }

    // Generate Excel file
    const excelBuffer = await generateExcelFile(products);

    // Send email with Excel attachment
    await sendEmail({
      to: email,
      subject: 'buyboxtr Ücretsiz Demo Excel\'iniz Hazır! Buybox\'ın Gücünü Keşfedin!',
      html: getEmailTemplate('demo_excel', {}),
      attachments: [
        {
          filename: 'demo-buybox-products.xlsx',
          content: excelBuffer,
        },
      ],
    });

    // Save demo request
    await DemoRequest.create({
      email,
      ipAddress,
      browserFingerprint,
      isDelivered: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Demo Excel dosyanız e-posta adresinize gönderildi!',
    });
  } catch (error) {
    console.error('Demo request error:', error);
    return NextResponse.json(
      { error: 'Demo talebi işlenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
