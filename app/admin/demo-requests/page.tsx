'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DemoRequest {
  _id: string;
  email: string;
  ipAddress: string;
  browserFingerprint: string;
  requestedAt: string;
  isDelivered: boolean;
}

export default function AdminDemoRequests() {
  const router = useRouter();
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadDemoRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDemoRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/demo-requests', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setDemoRequests(data.demoRequests);
      }
    } catch {
      console.error('Failed to load demo requests');
    } finally {
      setLoading(false);
    }
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
            <Link href="/admin/packages" className="text-gray-600 hover:text-purple-600 pb-2">
              Paketler
            </Link>
            <Link href="/admin/users" className="text-gray-600 hover:text-purple-600 pb-2">
              Kullanıcılar
            </Link>
            <Link href="/admin/demo-requests" className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-2">
              Demo Talepleri
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Demo Talepleri</h1>

        {/* Demo Requests Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Adresi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarayıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Talep Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {demoRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">
                    {request.browserFingerprint.substring(0, 12)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requestedAt).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      request.isDelivered
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.isDelivered ? 'Gönderildi' : 'Beklemede'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {demoRequests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Demo talebi bulunamadı.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
