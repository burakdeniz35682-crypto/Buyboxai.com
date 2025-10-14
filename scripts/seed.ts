import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../lib/models/Category';
import Package from '../lib/models/Package';
import ProductLink from '../lib/models/ProductLink';
import User from '../lib/models/User';
import { hashPassword } from '../lib/utils/auth';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buyboxtr';

const categories = [
  { name: 'Tişört', platform: 'Trendyol', activeLinkCount: 10000 },
  { name: 'Sweatshirt', platform: 'Trendyol', activeLinkCount: 2005 },
  { name: 'Akıllı Saat', platform: 'Trendyol', activeLinkCount: 540 },
  { name: 'Bluetooth Kulaklık', platform: 'Trendyol', activeLinkCount: 1230 },
  { name: 'Laptop', platform: 'Trendyol', activeLinkCount: 890 },
  { name: 'Telefon Kılıfı', platform: 'Trendyol', activeLinkCount: 5600 },
  { name: 'Spor Ayakkabı', platform: 'Trendyol', activeLinkCount: 3400 },
  { name: 'Cep Telefonu', platform: 'Trendyol', activeLinkCount: 780 },
  { name: 'Tablet', platform: 'Trendyol', activeLinkCount: 450 },
  { name: 'Powerbank', platform: 'Trendyol', activeLinkCount: 2100 },
  { name: 'Şarj Aleti', platform: 'Trendyol', activeLinkCount: 3200 },
  { name: 'Kamera', platform: 'Trendyol', activeLinkCount: 340 },
  { name: 'Oyuncu Mouse', platform: 'Trendyol', activeLinkCount: 980 },
  { name: 'Klavye', platform: 'Trendyol', activeLinkCount: 1540 },
  { name: 'Monitör', platform: 'Trendyol', activeLinkCount: 670 },
];

const packages = [
  {
    name: 'GİRİŞ SEVİYESİ BUYBOX HAKİMİYETİ',
    price: 5000,
    categoryLimit: 3,
    features: [
      '3 Kritik Kategori Seçimi',
      'Buybox\'ı AÇIK, Yüksek Kârlı Ürünler',
      'E-Ticaretin Geleceğine İlk Adım',
    ],
    isActive: true,
    displayOrder: 1,
  },
  {
    name: 'PROFESYONEL BUYBOX USTALIĞI',
    price: 7500,
    categoryLimit: 6,
    features: [
      '6 Stratejik Kategori Seçimi',
      'Buybox\'ı AÇIK, Yüksek Kârlı Ürünler',
      'Detaylı Rakip Analizi',
      'Rakiplerini Solla, Pazar Lideri Ol!',
    ],
    isActive: true,
    displayOrder: 2,
  },
  {
    name: 'ELİT BUYBOX SULTANLIĞI',
    price: 11500,
    categoryLimit: 10,
    features: [
      '10 Geniş Kategori Seçimi',
      'Buybox\'ı AÇIK, Yüksek Kârlı Ürünler',
      'Gelişmiş Trend Raporları',
      'E-Ticaretin Zirvesine Oynayanlara Özel!',
    ],
    isActive: true,
    displayOrder: 3,
  },
  {
    name: 'KURUMSAL SINIRSIZ GÜÇ',
    price: 100000,
    categoryLimit: 999,
    features: [
      'TÜM Kategoriler (Sınırsız)',
      'Sınırsız Erişim',
      'Özel Danışmanlık',
      'E-Ticaret Devleri İçin Özel Çözüm!',
    ],
    isActive: true,
    displayOrder: 4,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Package.deleteMany({});
    await ProductLink.deleteMany({});

    // Insert categories
    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Insert packages
    console.log('Inserting packages...');
    const insertedPackages = await Package.insertMany(packages);
    console.log(`Inserted ${insertedPackages.length} packages`);

    // Insert sample product links
    console.log('Inserting sample product links...');
    const sampleProducts = [];
    
    for (const category of insertedCategories.slice(0, 5)) {
      for (let i = 0; i < 50; i++) {
        sampleProducts.push({
          url: `https://www.trendyol.com/product-${category.name}-${i}`,
          category: category.name,
          platform: 'Trendyol',
          isBuyboxAvailable: true,
          price: Math.floor(Math.random() * 1000) + 50,
          sellerCount: Math.floor(Math.random() * 20) + 1,
          lastScannedAt: new Date(),
        });
      }
    }
    
    await ProductLink.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample product links`);

    // Create admin user
    console.log('Creating admin user...');
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@buyboxtr.com' });
    
    if (!adminExists) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await hashPassword(adminPassword);
      
      await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@buyboxtr.com',
        password: hashedPassword,
        name: 'Admin',
        roles: ['admin', 'user'],
      });
      
      console.log('Admin user created successfully');
      console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@buyboxtr.com'}`);
      console.log(`Password: ${adminPassword}`);
    } else {
      console.log('Admin user already exists');
    }

    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
