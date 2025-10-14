'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  orderNumber: string;
  packageId: {
    name: string;
    price: number;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  selectedCategories: Array<{ name: string }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if user is logged in (simple version without full auth)
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      setUser({ email: userEmail });
      loadOrders(userEmail);
    } else {
      setLoading(false);
    }
  }, []);

  const loadOrders = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        setUser(data.user);
        loadOrders(data.user.email);
      } else {
        setLoginError(data.error || 'Giriş başarısız');
      }
    } catch (error) {
      setLoginError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    setOrders([]);
    router.push('/');
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Beklemede': 'bg-yellow-100 text-yellow-800',
      'Ödendi': 'bg-blue-100 text-blue-800',
      'Teslim Edildi': 'bg-green-100 text-green-800',
      'İptal Edildi': 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Yükleniyor...</div>
      </div>
    );
  }

  // Login Form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              buyboxtr
            </Link>
          </nav>
        </header>

        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Giriş Yap</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">E-posta</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="ornek@mail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Şifre</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Hesabınız yok mu?{' '}
                <Link href="/#paketler" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Paketleri İnceleyin
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            buyboxtr
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Çıkış Yap
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Hoş Geldiniz, {user.name || user.email}!
          </h1>
          <p className="text-gray-600">Buybox komuta merkeziniz</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Toplam Sipariş</h3>
            <p className="text-3xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Aktif Sipariş</h3>
            <p className="text-3xl font-bold">
              {orders.filter(o => o.status === 'Beklemede' || o.status === 'Ödendi').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Teslim Edilen</h3>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Teslim Edildi').length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Siparişlerim</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">Henüz siparişiniz bulunmamaktadır.</p>
              <Link
                href="/#paketler"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
              >
                Paketleri İncele
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sipariş No</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tarih</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Paket</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tutar</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durum</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order.orderNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.packageId.name}</td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {order.totalAmount.toLocaleString('tr-TR')} TL
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4">
                        {order.status === 'Teslim Edildi' && (
                          <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                            Excel İndir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
