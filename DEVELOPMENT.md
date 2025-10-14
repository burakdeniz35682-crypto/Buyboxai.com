# buyboxtr.com - E-Ticaret Buybox Takip Sistemi

Modern, güçlü ve kullanıcı dostu bir SaaS platformu.

## Teknoloji Stack

- **Frontend:** Next.js 15 with App Router, React Server Components
- **UI:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based
- **Email:** Nodemailer
- **Excel Generation:** ExcelJS

## Kurulum

### Gereksinimler

- Node.js 18+
- MongoDB (local veya Atlas)
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment değişkenlerini ayarlayın:
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin ve gerekli değerleri girin:
- MongoDB bağlantı URI'si
- JWT secret key
- Email yapılandırması (SMTP)
- Banka bilgileri
- Admin kullanıcı bilgileri

3. Veritabanını seed edin (ilk kurulumda):
```bash
npm run seed
```

Bu komut:
- Kategorileri ekler
- Paketleri ekler
- Örnek ürün linklerini ekler
- Admin kullanıcısını oluşturur

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Proje Yapısı

```
/app                    # Next.js App Router sayfaları ve API routes
  /api                  # API endpoints
    /auth               # Kimlik doğrulama endpoints
    /orders             # Sipariş işlemleri
    /demo-request       # Demo Excel talebi
    /stats              # İstatistikler
    /categories         # Kategoriler
    /packages           # Paketler
  /dashboard            # Kullanıcı paneli
  /admin                # Admin paneli
  /checkout             # Satın alma sayfası
  page.tsx              # Ana sayfa
  layout.tsx            # Root layout

/lib                    # Utility fonksiyonlar ve modeller
  /models               # Mongoose modelleri
  /utils                # Yardımcı fonksiyonlar
  /email                # Email servisleri
  db.ts                 # Database connection

/scripts                # Yardımcı scriptler
  seed.ts               # Database seeding script

/public                 # Statik dosyalar
```

## API Endpoints

### Genel
- `GET /api/stats` - Anlık istatistikler
- `GET /api/categories` - Kategori listesi
- `GET /api/packages` - Paket listesi

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Orders
- `POST /api/orders` - Yeni sipariş oluştur
- `GET /api/orders?email=...` - Kullanıcı siparişlerini listele

### Demo
- `POST /api/demo-request` - Demo Excel talebi

## Admin Panel

Admin paneline `/admin` yolundan erişilebilir.

Varsayılan admin bilgileri (seed scriptinden sonra):
- Email: admin@buyboxtr.com
- Password: admin123

**ÖNEMLİ:** Production'da mutlaka şifreyi değiştirin!

## Veritabanı Modelleri

- **User:** Kullanıcı bilgileri
- **ProductLink:** Ürün linkleri
- **Category:** Kategoriler
- **Package:** Paketler
- **Order:** Siparişler
- **DemoRequest:** Demo talepleri

## Email Şablonları

Sistem aşağıdaki otomatik email'leri gönderir:
- Sipariş Alındı
- Hesap Oluşturuldu
- Ödeme Onaylandı
- Sipariş Teslim Edildi
- Demo Excel

## Deployment

### Vercel'e Deploy

```bash
npm run build
```

Vercel dashboard'dan MongoDB URI ve diğer environment değişkenlerini ayarlayın.

### Environment Variables (Production)

Production'da mutlaka ayarlanması gerekenler:
- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_*` (email yapılandırması)
- `ADMIN_EMAIL` ve `ADMIN_PASSWORD`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Lisans

Tüm hakları saklıdır. © 2025 buyboxtr
