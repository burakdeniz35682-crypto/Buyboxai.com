Rol: Sen, modern web teknolojileri konusunda uzmanlaşmış, hem frontend hem de backend geliştirmesi yapabilen kıdemli bir Full-Stack Geliştiricisin. Görevin, BuyboxAI.com adında, e-ticaret satıcılarına yönelik "Buybox" ürün veri listeleri satan, son derece profesyonel, modern ve satış odaklı bir web platformu oluşturmak. Projenin her aşamasını (tasarım, veritabanı, API, kullanıcı arayüzü, admin paneli) en ince ayrıntısına kadar planlayıp kodlayacaksın.

Proje Adı: BuyboxAI.com

Ana Fikir: Trendyol, Hepsiburada, Amazon gibi pazar yerlerindeki, "Buybox" (Sepete Ekle butonu) pozisyonu anlık olarak boşta olan veya kazanılması muhtemel ürünlerin listesini Excel formatında satan bir SaaS (Hizmet olarak Yazılım) platformu. Başlangıçta sadece Trendyol verisi sunulacak, diğerleri "Yakında..." olarak belirtilecek.

BÖLÜM 1: TEKNOLOJİ STACK'İ VE GENEL YAPI
Frontend: React.js veya Next.js (SEO ve performans için Next.js tercih edilir).

UI Kütüphanesi: Tailwind CSS (Modern ve hızlı tasarım için).

Backend: Node.js ve Express.js.

Veritabanı: MongoDB (Esnek veri yapısı için) veya PostgreSQL (İlişkisel veri bütünlüğü için).

E-posta Servisi: Otomatik e-postalar için SendGrid veya Nodemailer entegrasyonu.

Ödeme Altyapısı: Manuel Banka Havalesi (IBAN) sistemi.

BÖLÜM 2: FRONTEND (KULLANICI ARAYÜZÜ - Site Vitrini)
2.1. Ana Sayfa (Homepage)
Ana sayfanın amacı tek bir şey: Ziyaretçiyi müşteriye dönüştürmek. Abartılı, dikkat çekici, güven veren ve aciliyet hissi uyandıran bir tasarım olmalı.

Header:

Sol tarafta "BuyboxAI" logosu.

Sağ tarafta "Paketler", "Demo Başvurusu", "SSS", "İletişim" menüleri.

Hero Section (Ana Banner Alanı):

Arka Plan: Hareketli, teknolojik ve veri akışını simgeleyen soyut bir video veya animasyon.

Ana Başlık (Çok Büyük ve Vurgulu): "E-Ticarette Rakiplerinizi Yok Edin! Satışlarınızı %1000 Artıracak Gizli Silahınız Burada."

Alt Başlık: "Gelişmiş Buybox Yapay Zeka Modelimiz, Trendyol'daki Altın Değerindeki Binlerce Ürünü Saniyeler İçinde Önünüze Seriyor. Fırsatları Kaçırmayın!"

Call-to-Action Butonları:

Büyük ve dikkat çekici birincil buton: "PAKETLERİ GÖR VE SATIN AL"

İkincil, daha küçük bir buton: "ÜCRETSİZ DEMO EXCEL'İ AL"

Dinamik Veri Alanı (Banner Altında):

Toplam Taranan Ürün Linki: [Veritabanından Gelen Sayı] Adet

Son Tarama Zamanı: [Bugünün Tarihi ve Saati] - Verilerimiz Daima Güncel!

Platform Tanıtım Alanı:

"Desteklenen Platformlar" başlığı altında logolar:

Trendyol (Renkli ve aktif)

Hepsiburada (Gri ve "Yakında..." yazılı)

Amazon TR (Gri ve "Yakında..." yazılı)

"Neden BuyboxAI?" Bölümü (İkonlar ve Kısa Metinler):

Yapay Zeka İkonu: "Anlık Veri Analizi: Gelişmiş AI modelimiz, günde milyonlarca ürünü tarayarak en kârlı Buybox fırsatlarını anında tespit eder."

Roket İkonu: "Cironuzu Uçurun: Rakiplerinizin görmediği ürünlere ilk siz girin, satış rekorları kırın."

Excel İkonu: "Kolay Kullanım: Tek tıkla binlerce ürünü içeren hazır Excel listesini anında e-postanıza alın. Zaman kaybetmeyin."

Paketler Bölümü (Fiyatlandırma Tablosu):

Yan yana duran 4 adet kart tasarımı. Bir tanesi "En Popüler" etiketiyle öne çıkarılmalı.

Paket 1: Başlangıç Paketi

3 Kategori Seçimi

Buybox'ı Açık Ürünler

5,000 TL

"Hemen Başla" butonu

Paket 2: Profesyonel Paket (En Popüler)

6 Kategori Seçimi

Buybox'ı Açık Ürünler

7,500 TL

"Hemen Başla" butonu

Paket 3: Elit Paket

10 Kategori Seçimi

Buybox'ı Açık Ürünler

11,500 TL

"Hemen Başla" butonu

Paket 4: Kurumsal Çözüm

TÜM KATEGORİLER

Sınırsız Erişim

100,000 TL

"Teklif Al" butonu

Tanıtım Videosu Alanı:

"Sistemimiz Nasıl Çalışıyor? 2 Dakikada İzleyin!" başlığı.

Profesyonel görünümlü bir video oynatıcı gömme alanı.

Demo Excel Başvuru Formu:

Başlık: "Risk Almayın, Gücümüzü Kendi Gözlerinizle Görün!"

Alt Başlık: "E-posta adresinizi yazın, 10 farklı kategoriden rastgele seçilmiş Buybox ürün linklerini içeren demo Excel dosyasını anında gönderelim."

[E-posta Adresiniz] input alanı.

"DEMO EXCEL'İ GÖNDER" butonu.

Footer:

Hakkımızda, Gizlilik Politikası, Kullanım Şartları linkleri.

İletişim bilgileri: WhatsApp destek hattı (WhatsApp logosu ile), Çağrı merkezi numarası.

2.2. Satın Alma Akışı
Kategori Seçim Sayfası (Paket seçildikten sonra):

Kullanıcının seçtiği pakete göre (3, 6 veya 10) adet kategori seçmesine izin verilir.

Kategoriler bir liste halinde sunulur. Her kategori yanında o anki mevcut link sayısı dinamik olarak yazmalıdır.

Örnek Liste:

[ ] Tişört (Mevcut Buybox Linki: 10,000)

[ ] Sweatshirt (Mevcut Buybox Linki: 2,005)

[ ] Akıllı Saat (Mevcut Buybox Linki: 540)

...

Kullanıcı seçimini yaptıkça kalan seçim hakkı gösterilir: (2/6 kategori seçildi)

Seçimler tamamlandığında "Ödeme Adımına Geç" butonu aktif olur.

Ödeme ve Bilgi Formu Sayfası:

Sipariş Özeti: Seçilen paket, seçilen kategoriler ve toplam tutar gösterilir.

Müşteri Bilgileri Formu:

Excel Tablosunun Gönderileceği E-posta Adresi:

Ad Soyad:

Fatura Bilgileri Formu:

Firma Adı / Şahıs:

Vergi Dairesi:

Vergi Numarası / TC Kimlik No:

Adres:

Sipariş Onay Sayfası:

Başlık: "Siparişiniz Başarıyla Alınmıştır!"

Metin: [Toplam Tutar] TL tutarındaki ödemeyi aşağıdaki IBAN adresine sipariş numaranızı ([Sipariş No]) açıklama kısmına ekleyerek yapınız. Ödemeniz onaylandıktan sonra Excel listeniz ve hesap bilgileriniz e-posta adresinize gönderilecektir.

IBAN Bilgileri:

Alıcı Adı:

IBAN:

Banka:

Destek Bilgileri: "Herhangi bir sorunuz için WhatsApp Destek Hattı'mızdan bize ulaşabilirsiniz."

BÖLÜM 3: BACKEND (SUNUCU TARAFI MANTIK)
3.1. Veritabanı Modelleri (Schemas)
User (Kullanıcı): email, password (hash'lenmiş), createdAt.

ProductLink (Ürün Linki): url, category, platform (Trendyol vb.), lastScannedAt.

Category (Kategori): name, platform, activeLinkCount (Bu sayı bir script ile periyodik olarak güncellenmeli).

Package (Paket): name (Başlangıç, Profesyonel vb.), price, categoryLimit. (Fiyatlar admin panelinden düzenlenebilir olmalı).

Order (Sipariş): orderNumber, userEmail, packageId, selectedCategories (Array), totalAmount, status ('Beklemede', 'Ödendi', 'Teslim Edildi'), createdAt.

3.2. API Endpoints (İstek Noktaları)
POST /api/auth/register: İlk siparişte otomatik kullanıcı oluşturma.

POST /api/orders: Yeni sipariş oluşturma.

POST /api/demo-request: Demo excel talebi alır, e-posta gönderimini tetikler.

GET /api/stats: Ana sayfadaki toplam link sayısı ve son tarama tarihi gibi verileri döndürür.

GET /api/categories: Kategori listesini ve link sayılarını satın alma sayfası için döndürür.

Admin API'leri (Auth Korumalı):

GET /api/admin/orders: Tüm siparişleri listeler.

PUT /api/admin/orders/:id: Sipariş durumunu günceller (Ödendi, Teslim Edildi).

GET /api/admin/dashboard-stats: Ciro, satış sayısı gibi istatistikleri döndürür (günlük, haftalık, aylık).

PUT /api/admin/packages/:id: Paket fiyatlarını günceller.

3.3. İş Mantığı (Business Logic)
Sipariş Süreci:

Kullanıcı sipariş verdiğinde, Order tablosuna status: 'Beklemede' olarak kaydedilir.

Kullanıcıya "Siparişiniz Alındı" e-postası gider (IBAN bilgileri ve sipariş no ile).

Aynı anda, eğer e-posta sistemde kayıtlı değilse yeni bir User oluşturulur ve geçici bir şifre ile "Hesabınız Oluşturuldu" e-postası gönderilir.

Ödeme Onayı (Manuel):

Admin, banka hesabını kontrol eder.

Admin panelinden ilgili siparişi bulup durumunu "Ödendi" olarak günceller.

Teslimat Süreci (Otomatik):

Sipariş durumu "Ödendi" olarak güncellendiğinde sistem otomatik olarak tetiklenir.

Siparişte seçilen kategorilere ait ürün linklerini veritabanından çeker.

Bu linklerden bir Excel dosyası oluşturur.

Excel dosyasını kullanıcının e-posta adresine ek olarak gönderir. Gönderim metninde "Siparişiniz Hazırlandı" yazar.

Sipariş durumunu "Teslim Edildi" olarak günceller.

Demo Excel Otomasyonu:

Kullanıcı demo talep ettiğinde, sistem veritabanından rastgele 10 ürün linki seçer.

Bu linklerden anında bir Excel dosyası oluşturur.

Kullanıcının girdiği e-posta adresine bu dosyayı otomatik olarak gönderir.

BÖLÜM 4: ADMİN PANELİ
Basit ve anlaşılır bir arayüze sahip olmalı. /admin gibi bir yoldan erişilebilir ve şifre korumalı olmalı.

Dashboard (Gösterge Paneli):

Bugünkü Satış Adedi

Bugünkü Ciro

Haftalık / Aylık / Yıllık Ciro Grafikleri

Bekleyen Sipariş Sayısı

Sipariş Yönetimi:

Tüm siparişlerin listelendiği bir tablo (Sipariş No, Müşteri E-postası, Tutar, Durum, Tarih).

Her siparişin detayını görme ve durumunu (Beklemede -> Ödendi -> Teslim Edildi) tek tıkla değiştirme imkanı.

Paket Yönetimi:

Mevcut 4 paketin listesi.

Her paketin yanındaki "Düzenle" butonu ile fiyatını güncelleme imkanı.
