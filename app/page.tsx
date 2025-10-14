'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalLinks: number;
  lastScanTime: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ totalLinks: 0, lastScanTime: '' });
  const [demoEmail, setDemoEmail] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);
    setDemoMessage('');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail }),
      });

      const data = await response.json();
      
      if (data.success) {
        setDemoMessage('✅ Demo Excel dosyanız e-posta adresinize gönderildi!');
        setDemoEmail('');
      } else {
        setDemoMessage('❌ ' + data.error);
      }
    } catch {
      setDemoMessage('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setDemoLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('tr-TR');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('tr-TR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              buyboxtr
            </Link>
            <div className="hidden md:flex space-x-8">
              <a href="#paketler" className="text-gray-700 hover:text-purple-600 transition">Paketler</a>
              <a href="#demo" className="text-gray-700 hover:text-purple-600 transition">Ücretsiz Demo</a>
              <a href="#video" className="text-gray-700 hover:text-purple-600 transition">Nasıl Çalışır?</a>
              <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition">Giriş Yap</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-pulse">
            RAKİPLERİNİZİN BİLE AKLINA GELMEYEN FIRSATLAR!
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            SATIŞLARINIZI MİNİMUM %1000 ARTTIRIN
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Gelişmiş Buybox Yapay Zeka Modelimiz, Trendyol&apos;daki milyarlarca ürün arasından 
            BUYBOX&apos;I ANLIK OLARAK BOŞTA OLAN veya KESİN KAZANILACAK binlerce ürünü saniyeler içinde önünüze seriyor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#paketler" className="px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg">
              HEMEN PAKETLERİ İNCELE VE BUYBOX&apos;I ELE GEÇİR!
            </a>
            <a href="#demo" className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
              ÜCRETSİZ DEMO EXCEL İLE GÜCÜMÜZÜ TEST ET!
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
                Anlık Toplam Taranan Buybox Ürün Linki
              </p>
              <p className="text-4xl font-bold text-yellow-400">
                {formatNumber(stats.totalLinks)} ADET
              </p>
              <p className="text-xs text-gray-400 mt-1">(Sürekli Artıyor!)</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
                Son Yapay Zeka Tarama Zamanı
              </p>
              <p className="text-2xl font-bold">
                {formatDate(stats.lastScanTime)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Verilerimiz Milisaniyeler İçinde Yenileniyor!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-8">
            BUYBOX&apos;INI ANINDA ELE GEÇİREBİLECEĞİNİZ PLATFORMLAR
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-xl">
              <div className="text-6xl mb-4">🛒</div>
              <h4 className="text-2xl font-bold mb-2">Trendyol</h4>
              <p className="text-lg font-semibold">ŞİMDİ AKTİF! FIRSATLARI YAKALA!</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-300 text-gray-600 shadow-xl">
              <div className="text-6xl mb-4 grayscale">🛍️</div>
              <h4 className="text-2xl font-bold mb-2">Hepsiburada</h4>
              <p className="text-lg">ÇOK YAKINDA... HAZIR OLUN!</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-300 text-gray-600 shadow-xl">
              <div className="text-6xl mb-4 grayscale">📦</div>
              <h4 className="text-2xl font-bold mb-2">Amazon TR</h4>
              <p className="text-lg">ÇOK YAKINDA... E-TİCARET DÜNYASI BUNU BEKLİYOR!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-12">
            buyboxtr Neden Rakipsiz?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">🤖</div>
              <h4 className="text-xl font-bold mb-3">Kuantum Seviyesinde AI</h4>
              <p className="text-gray-600">
                Gelişmiş AI algoritmamız, milyonlarca data noktasını eş zamanlı tarayarak 
                Buybox fırsatlarını milisaniyeler içinde tespit eder.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">🚀</div>
              <h4 className="text-xl font-bold mb-3">Cironuzu Binlerce Kat Uçurun</h4>
              <p className="text-gray-600">
                Rakiplerinizin henüz haberi bile olmadan, en değerli Buybox pozisyonlarına 
                anında yerleşin ve satış rekorları kırın.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">💎</div>
              <h4 className="text-xl font-bold mb-3">Altın Madeninize Erişim</h4>
              <p className="text-gray-600">
                Tek bir tıkla, binlerce kârlı ürünü içeren Excel listesini anında e-postanıza alın. 
                Yüzlerce saati tasarruf edin!
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-6xl mb-4">🛡️</div>
              <h4 className="text-xl font-bold mb-3">Maksimum Güvenlik</h4>
              <p className="text-gray-600">
                En üst düzey şifreleme ve güvenlik protokolleri ile verileriniz her zaman güvende. 
                Ticari sırlarınız bize emanet!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paketler" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-4">
            Geleceğe Yatırım Yapın!
          </h3>
          <p className="text-xl text-center text-gray-600 mb-12">
            İhtiyacınıza uygun paketi seçin ve Buybox&apos;ın hakimi olun
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Package 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-2xl transition">
              <h4 className="text-2xl font-bold mb-2">GİRİŞ SEVİYESİ</h4>
              <p className="text-gray-600 mb-4">Buybox Hakimiyeti</p>
              <div className="text-4xl font-bold text-purple-600 mb-4">5,000 TL</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>3 Kritik Kategori Seçimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Buybox&apos;ı Açık, Yüksek Kârlı Ürünler</span>
                </li>
              </ul>
              <Link href="/checkout?package=1" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700 transition">
                BU FIRSATI KAÇIRMA!
              </Link>
            </div>

            {/* Package 2 - Most Popular */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-6 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                EN ÇOK SATAN!
              </div>
              <h4 className="text-2xl font-bold mb-2">PROFESYONEL</h4>
              <p className="mb-4">Buybox Uzmanlığı</p>
              <div className="text-4xl font-bold mb-4">7,500 TL</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>6 Stratejik Kategori Seçimi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Buybox + Detaylı Rakip Analizi</span>
                </li>
              </ul>
              <Link href="/checkout?package=2" className="block w-full bg-white text-orange-600 text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                HEMEN YÜKSELİŞE GEÇ!
              </Link>
            </div>

            {/* Package 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-2xl transition">
              <h4 className="text-2xl font-bold mb-2">ELİT</h4>
              <p className="text-gray-600 mb-4">Buybox Sultanlığı</p>
              <div className="text-4xl font-bold text-purple-600 mb-4">11,500 TL</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>10 Geniş Kategori Seçimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Buybox + Gelişmiş Trend Raporları</span>
                </li>
              </ul>
              <Link href="/checkout?package=3" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700 transition">
                ZİRVEYE ÇIK!
              </Link>
            </div>

            {/* Package 4 */}
            <div className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-6 hover:shadow-2xl transition">
              <h4 className="text-2xl font-bold mb-2">KURUMSAL</h4>
              <p className="mb-4">Sınırsız Güç</p>
              <div className="text-4xl font-bold mb-4">100,000 TL</div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>TÜM Kategoriler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Sınırsız Erişim + Özel Danışmanlık</span>
                </li>
              </ul>
              <a href="#iletisim" className="block w-full bg-yellow-400 text-black text-center py-3 rounded-lg font-bold hover:bg-yellow-300 transition">
                ÖZEL TEKLİF AL!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            buyboxtr NASIL ÇALIŞIYOR?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            90 Saniyede E-Ticaretin Yeni Kurallarını Öğrenin!
          </p>
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3OGl69sY9Ys"
              title="buyboxtr Tanıtım Videosu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Demo Excel Form */}
      <section id="demo" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">
            GÜCÜMÜZÜ KENDİ GÖZLERİNİZLE GÖRÜN
          </h3>
          <p className="text-xl mb-8">
            E-posta adresinizi girin, yapay zekamız tarafından rastgele seçilmiş 
            10 FARKLI KATEGORİDEN EN KÂRLI Buybox ürün linklerini içeren 
            DEMO Excel dosyasını anında e-postanıza gönderelim!
          </p>
          <form onSubmit={handleDemoRequest} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                placeholder="E-posta Adresiniz"
                required
                className="flex-1 px-6 py-4 rounded-lg text-black text-lg"
              />
              <button
                type="submit"
                disabled={demoLoading}
                className="px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoLoading ? 'GÖNDERİLİYOR...' : 'DEMO EXCEL\'İ GÖNDER!'}
              </button>
            </div>
          </form>
          {demoMessage && (
            <div className={`mt-4 p-4 rounded-lg ${demoMessage.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
              {demoMessage}
            </div>
          )}
          <p className="mt-6 text-sm">
            ⚠️ Her mail adresi, IP ve tarayıcı için sadece 1 kez demo talebi yapılabilir. 
            Bu altın fırsatı akıllıca kullanın!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">buyboxtr</h4>
              <p className="text-gray-400">
                E-Ticaretin geleceğinde lider platform
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Hızlı Linkler</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">Hakkımızda</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Kullanım Şartları</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">İletişim</h5>
              <p className="text-gray-400 mb-2">
                📱 WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+90 5XX XXX XX XX'}
              </p>
              <p className="text-gray-400">
                📧 E-posta: info@buyboxtr.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 buyboxtr. Tüm hakları saklıdır. Geleceğin E-Ticaretinde Lider!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


