'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Package {
  _id: string;
  name: string;
  price: number;
  categoryLimit: number;
  features: string[];
  isActive: boolean;
}

export default function AdminPackages() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    categoryLimit: 0,
    features: [''],
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPackages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/packages', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setPackages(data.packages);
      }
    } catch {
      console.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      categoryLimit: pkg.categoryLimit,
      features: pkg.features,
      isActive: pkg.isActive,
    });
  };

  const handleSave = async () => {
    if (!editingPackage) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/packages/${editingPackage._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Paket güncellendi!');
        setEditingPackage(null);
        loadPackages();
      } else {
        alert(data.message || 'Güncelleme başarısız');
      }
    } catch {
      alert('Bir hata oluştu');
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            buyboxtr Admin
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <Link href="/admin" className="text-gray-600 hover:text-purple-600 pb-2">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="text-gray-600 hover:text-purple-600 pb-2">
              Siparişler
            </Link>
            <Link href="/admin/packages" className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-2">
              Paketler
            </Link>
            <Link href="/admin/users" className="text-gray-600 hover:text-purple-600 pb-2">
              Kullanıcılar
            </Link>
            <Link href="/admin/demo-requests" className="text-gray-600 hover:text-purple-600 pb-2">
              Demo Talepleri
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Paket Yönetimi</h1>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">
                {pkg.price.toLocaleString('tr-TR')} TL
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {pkg.categoryLimit} Kategori
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs rounded ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {pkg.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <button
                onClick={() => handleEdit(pkg)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Düzenle
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Paket Düzenle</h2>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Paket Adı</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Fiyat (TL)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Kategori Limiti</label>
                    <input
                      type="number"
                      value={formData.categoryLimit}
                      onChange={(e) => setFormData({ ...formData, categoryLimit: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Özellikler</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg"
                        placeholder="Özellik açıklaması"
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    + Özellik Ekle
                  </button>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-semibold">Aktif</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingPackage(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
