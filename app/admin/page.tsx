'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  todaySales: number;
  todayRevenue: number;
  pendingOrders: number;
  totalOrders: number;
  totalRevenue: number;
  recentDemoRequests: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      loadDashboardStats();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        loadDashboardStats();
      } else {
        setLoginError(data.message || 'Giriş başarısız');
      }
    } catch {
      setLoginError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const loadDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch {
      console.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setStats(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
            buyboxtr Admin
          </h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
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
        </div>
      </div>
    );
  }

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            buyboxtr Admin
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <Link href="/admin" className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-2">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="text-gray-600 hover:text-purple-600 pb-2">
              Siparişler
            </Link>
            <Link href="/admin/packages" className="text-gray-600 hover:text-purple-600 pb-2">
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Bugünkü Satışlar</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.todaySales || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Bugünkü Ciro</h3>
            <p className="text-3xl font-bold text-green-600">
              {(stats?.todayRevenue || 0).toLocaleString('tr-TR')} TL
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Bekleyen Siparişler</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.pendingOrders || 0}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Toplam Ciro</h3>
            <p className="text-3xl font-bold text-blue-600">
              {(stats?.totalRevenue || 0).toLocaleString('tr-TR')} TL
            </p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Hızlı İstatistikler</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Toplam Sipariş:</span>
                <span className="font-bold">{stats?.totalOrders || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Son Demo Talepleri:</span>
                <span className="font-bold">{stats?.recentDemoRequests || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Hızlı Erişim</h3>
            <div className="space-y-2">
              <Link
                href="/admin/orders"
                className="block px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-center"
              >
                Bekleyen Siparişleri Görüntüle
              </Link>
              <Link
                href="/admin/packages"
                className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-center"
              >
                Paketleri Yönet
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
