# buyboxtr.com - E-Ticaret Buybox Takip ve Analiz Platformu

buyboxtr.com, e-ticaret satıcılarının Trendyol ve diğer pazaryerlerinde Buybox (Sepete Ekle butonu) fırsatlarını yakalamalarına yardımcı olan, yapay zeka destekli bir SaaS platformudur.

## 🚀 Özellikler

### Kullanıcı Arayüzü
- **Modern ve Duyarlı Tasarım**: Tüm cihazlarda mükemmel çalışır
- **Göz Alıcı Ana Sayfa**: Satış odaklı, kullanıcıyı harekete geçiren tasarım
- **Çok Adımlı Checkout**: Paket seçimi → Kategori seçimi → Ödeme bilgileri
- **Kullanıcı Dashboard**: Sipariş takibi, hesap yönetimi
- **Demo Excel Talebi**: Ücretsiz demo ile platformu test etme

### Backend Özellikleri
- **RESTful API**: Next.js API Routes ile güvenli backend
- **MongoDB Veritabanı**: Esnek ve ölçeklenebilir
- **JWT Authentication**: Güvenli kimlik doğrulama
- **Email Automation**: Otomatik bildirimler
- **Excel Generation**: Otomatik rapor oluşturma

## 📋 Gereksinimler

- Node.js 18+
- MongoDB
- npm veya yarn

## 🛠️ Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Environment Değişkenlerini Ayarlayın

```bash
cp .env.local.example .env.local
```

Gerekli değerleri `.env.local` dosyasında güncelleyin.

### 3. Veritabanını Seed Edin

```bash
npm run seed
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🔌 Ana API Endpoints

- `GET /api/stats` - İstatistikler
- `GET /api/categories` - Kategoriler
- `GET /api/packages` - Paketler
- `POST /api/auth/login` - Giriş
- `POST /api/orders` - Sipariş oluştur
- `POST /api/demo-request` - Demo talebi

## 🎨 Teknoloji Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- MongoDB + Mongoose
- JWT + bcryptjs
- TypeScript

## 🚀 Production Deployment

```bash
npm run build
```

Environment değişkenlerini production ortamında ayarlayın.

## 📖 Proje Spesifikasyonu

Orijinal proje spesifikasyonu için `README-SPEC.md` dosyasına bakın.

## 📝 Lisans

Tüm hakları saklıdır. © 2025 buyboxtr

---

**buyboxtr** - E-Ticaretin Geleceğinde Lider!
