# buyboxtr.com - Quick Start Guide

## 🚀 Hızlı Başlangıç (5 Dakika)

### 1. Proje Kurulumu

```bash
# Bağımlılıkları yükle
npm install

# Environment dosyasını oluştur
cp .env.local.example .env.local
```

### 2. MongoDB Kurulumu

**Seçenek A: Local MongoDB**
```bash
# MongoDB yüklü değilse:
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: https://www.mongodb.com/try/download/community

# MongoDB'yi başlat
mongod
```

**Seçenek B: MongoDB Atlas (Ücretsiz)**
1. https://www.mongodb.com/cloud/atlas adresine git
2. Ücretsiz cluster oluştur
3. Connection string'i al
4. `.env.local` dosyasında `MONGODB_URI`'yi güncelle

### 3. Environment Değişkenlerini Ayarla

`.env.local` dosyasını aç ve şunları güncelle:

```bash
# MongoDB (Yukarıdaki adımdan)
MONGODB_URI=mongodb://localhost:27017/buyboxtr

# JWT Secret (Güvenli bir değer)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email (Test için Gmail kullanabilirsiniz)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # Gmail App Password
EMAIL_FROM=noreply@buyboxtr.com

# Diğerleri varsayılan olarak kalabilir
```

### 4. Veritabanını Hazırla

```bash
npm run seed
```

Bu komut:
- ✅ 15 kategori ekler
- ✅ 4 paket oluşturur
- ✅ 250 örnek ürün linki ekler
- ✅ Admin kullanıcısı oluşturur

Konsola yazdırılan admin bilgilerini not alın!

### 5. Uygulamayı Başlat

```bash
npm run dev
```

Tarayıcınızda şu adresi açın: **http://localhost:3000**

## 🎯 Test Senaryoları

### 1. Ana Sayfayı Gez
- Modern landing page'i incele
- Paketlere göz at
- Demo Excel talebi yap (gerçek email adresi kullan)

### 2. Sipariş Ver
1. Bir paket seç
2. Kategorileri seç
3. Bilgileri doldur
4. Sipariş ver
5. Sipariş onay sayfasını gör

### 3. Dashboard'a Giriş Yap
1. `/dashboard` sayfasına git
2. Sipariş verirken kullandığın email ve otomatik oluşturulan şifreyle giriş yap
   - Şifre email'inde gönderilecek
3. Siparişlerini gör

### 4. Admin Girişi
1. `/dashboard` sayfasına git
2. Seed scriptinin verdiği admin bilgileriyle giriş yap
   - Email: admin@buyboxtr.com
   - Password: admin123 (seed sırasında belirtilen)

## 📧 Email Test Etme

### Gmail Kullanıyorsanız:

1. Gmail hesabınızda 2FA'yı aktifleştirin
2. App Password oluşturun:
   - https://myaccount.google.com/apppasswords
3. Oluşturulan şifreyi `.env.local`'de `EMAIL_PASSWORD` olarak kullanın

### Test Emailları Görmek İçin:

Alternatif olarak [Mailtrap](https://mailtrap.io/) kullanabilirsiniz:
```bash
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your-mailtrap-username
EMAIL_PASSWORD=your-mailtrap-password
```

## 🔍 Sorun Giderme

### MongoDB bağlanmıyor
```bash
# MongoDB'nin çalıştığını kontrol et
mongod --version

# Connection string'i kontrol et
echo $MONGODB_URI
```

### Build hataları
```bash
# node_modules'u temizle ve tekrar yükle
rm -rf node_modules package-lock.json
npm install
```

### Email gönderilmiyor
```bash
# Email yapılandırmasını kontrol et
# Konsol loglarını incele
# Mailtrap gibi test servisi kullan
```

## 📚 Daha Fazla Bilgi

- `DEVELOPMENT.md` - Detaylı geliştirme dökümantasyonu
- `README-SPEC.md` - Orijinal proje spesifikasyonu
- `README.md` - Ana dökümantasyon

## 🎉 Başarılı!

Artık buyboxtr.com local ortamınızda çalışıyor!

Sonraki adımlar:
- Kendi tasarımlarınızı ekleyin
- API'leri genişletin
- Admin paneli geliştirin
- Production'a deploy edin

---

**İyi Kodlamalar!** 🚀
