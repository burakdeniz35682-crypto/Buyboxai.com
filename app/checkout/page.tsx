'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  activeLinkCount: number;
}

interface Package {
  id: string;
  name: string;
  price: number;
  categoryLimit: number;
  features: string[];
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('package');
  
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [step, setStep] = useState<'package' | 'categories' | 'checkout'>('package');
  const [loading, setLoading] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    companyName: '',
    taxOffice: '',
    taxNumber: '',
    address: '',
    city: '',
    district: '',
  });

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPackages(data.packages);
          if (packageId) {
            const pkg = data.packages.find((p: Package) => p.id === packageId);
            if (pkg) {
              setSelectedPackage(pkg);
              setStep('categories');
            }
          }
        }
      });

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.categories);
        }
      });
  }, [packageId]);

  const handleCategoryToggle = (categoryId: string) => {
    if (!selectedPackage) return;
    
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      if (selectedCategories.length < selectedPackage.categoryLimit) {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerInfo.email,
          packageId: selectedPackage.id,
          selectedCategories,
          customerInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/order-confirmation?orderNumber=${data.orderNumber}`);
      } else {
        alert('Hata: ' + data.error);
      }
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Package Selection */}
        {step === 'package' && (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8">Paketinizi Seçin</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-4">
                    {pkg.price.toLocaleString('tr-TR')} TL
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setStep('categories');
                    }}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
                  >
                    Seç
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Selection */}
        {step === 'categories' && selectedPackage && (
          <div>
            <h1 className="text-4xl font-bold text-center mb-4">Kategorilerinizi Seçin</h1>
            <p className="text-center text-xl text-gray-600 mb-8">
              {selectedPackage.categoryLimit} kategori seçebilirsiniz. 
              Seçilenler: {selectedCategories.length}/{selectedPackage.categoryLimit}
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedCategories.includes(cat.id)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        disabled={
                          !selectedCategories.includes(cat.id) &&
                          selectedCategories.length >= selectedPackage.categoryLimit
                        }
                        className="w-5 h-5 mr-3"
                      />
                      <div>
                        <p className="font-semibold">{cat.name}</p>
                        <p className="text-sm text-gray-500">
                          {cat.activeLinkCount.toLocaleString('tr-TR')}+ link
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('package')}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition"
              >
                ← Geri
              </button>
              <button
                onClick={() => setStep('checkout')}
                disabled={selectedCategories.length !== selectedPackage.categoryLimit}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ödeme Adımına Geç →
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {step === 'checkout' && selectedPackage && (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8">Sipariş Bilgileri</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Müşteri Bilgileri</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">E-posta Adresi *</label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="ornek@mail.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ad Soyad *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Telefon *</label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4">Fatura Bilgileri</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Firma Adı / Şahıs Adı</label>
                      <input
                        type="text"
                        value={customerInfo.companyName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, companyName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Vergi Dairesi</label>
                        <input
                          type="text"
                          value={customerInfo.taxOffice}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, taxOffice: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Vergi/TC No</label>
                        <input
                          type="text"
                          value={customerInfo.taxNumber}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, taxNumber: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Adres</label>
                      <textarea
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">İl</label>
                        <input
                          type="text"
                          value={customerInfo.city}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">İlçe</label>
                        <input
                          type="text"
                          value={customerInfo.district}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('categories')}
                      className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition"
                    >
                      ← Geri
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
                    >
                      {loading ? 'İşleniyor...' : 'Siparişi Tamamla →'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <h2 className="text-2xl font-bold mb-4">Sipariş Özeti</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Paket:</span>
                      <span>{selectedPackage.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-semibold">Kategori Sayısı:</span>
                      <span>{selectedCategories.length}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <h3 className="font-semibold mb-2">Seçilen Kategoriler:</h3>
                    <ul className="text-sm space-y-1">
                      {selectedCategories.map(catId => {
                        const cat = categories.find(c => c.id === catId);
                        return cat ? <li key={catId}>• {cat.name}</li> : null;
                      })}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Toplam:</span>
                      <span className="text-purple-600">
                        {selectedPackage.price.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            buyboxtr
          </Link>
        </nav>
      </header>

      <Suspense fallback={<div className="text-center py-12">Yükleniyor...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
