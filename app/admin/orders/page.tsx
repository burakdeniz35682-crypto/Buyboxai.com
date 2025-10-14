'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  orderNumber: string;
  userEmail: string;
  packageId: {
    name: string;
    price: number;
  };
  selectedCategories: Array<{ name: string }>;
  totalAmount: number;
  status: string;
  createdAt: string;
  customerInfo: {
    name: string;
    phone: string;
    companyName?: string;
    taxOffice?: string;
    taxNumber?: string;
  };
}

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const url = `/api/admin/orders${filter !== 'all' ? `?status=${filter}` : ''}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!confirm(`Sipariş durumunu "${newStatus}" olarak değiştirmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Sipariş durumu güncellendi!');
        loadOrders();
        setSelectedOrder(null);
      } else {
        alert(data.message || 'Güncelleme başarısız');
      }
    } catch {
      alert('Bir hata oluştu');
    }
  };

  const resendExcel = async (orderId: string) => {
    if (!confirm('Excel dosyasını tekrar göndermek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/orders/${orderId}/resend-excel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        alert('Excel dosyası tekrar gönderildi!');
      } else {
        alert(data.message || 'Gönderim başarısız');
      }
    } catch {
      alert('Bir hata oluştu');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'Ödendi': return 'bg-blue-100 text-blue-800';
      case 'Teslim Edildi': return 'bg-green-100 text-green-800';
      case 'İptal Edildi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <Link href="/admin/orders" className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-2">
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
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Tümü ({orders.length})
            </button>
            <button
              onClick={() => setFilter('Beklemede')}
              className={`px-4 py-2 rounded-lg ${filter === 'Beklemede' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Beklemede
            </button>
            <button
              onClick={() => setFilter('Ödendi')}
              className={`px-4 py-2 rounded-lg ${filter === 'Ödendi' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Ödendi
            </button>
            <button
              onClick={() => setFilter('Teslim Edildi')}
              className={`px-4 py-2 rounded-lg ${filter === 'Teslim Edildi' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Teslim Edildi
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sipariş No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{order.customerInfo.name}</div>
                    <div className="text-xs text-gray-400">{order.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.packageId.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {order.totalAmount.toLocaleString('tr-TR')} TL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-purple-600 hover:text-purple-900 mr-4"
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Sipariş bulunamadı.
            </div>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sipariş Detayları</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Sipariş Bilgileri</h3>
                  <p>Sipariş No: {selectedOrder.orderNumber}</p>
                  <p>Durum: <span className={`px-2 py-1 text-xs rounded ${getStatusBadgeColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
                  <p>Tarih: {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Müşteri Bilgileri</h3>
                  <p>Ad Soyad: {selectedOrder.customerInfo.name}</p>
                  <p>Email: {selectedOrder.userEmail}</p>
                  <p>Telefon: {selectedOrder.customerInfo.phone}</p>
                  {selectedOrder.customerInfo.companyName && (
                    <>
                      <p>Firma: {selectedOrder.customerInfo.companyName}</p>
                      <p>Vergi Dairesi: {selectedOrder.customerInfo.taxOffice}</p>
                      <p>Vergi No: {selectedOrder.customerInfo.taxNumber}</p>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Paket Bilgileri</h3>
                  <p>Paket: {selectedOrder.packageId.name}</p>
                  <p>Tutar: {selectedOrder.totalAmount.toLocaleString('tr-TR')} TL</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Seçilen Kategoriler</h3>
                  <ul className="list-disc list-inside">
                    {selectedOrder.selectedCategories.map((cat, idx) => (
                      <li key={idx}>{cat.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <h3 className="font-semibold text-gray-700">Durum Değiştir</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status !== 'Ödendi' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder._id, 'Ödendi')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Ödendi Olarak İşaretle
                      </button>
                    )}
                    {selectedOrder.status === 'Ödendi' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder._id, 'Teslim Edildi')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Teslim Edildi Olarak İşaretle
                      </button>
                    )}
                    {selectedOrder.status === 'Teslim Edildi' && (
                      <button
                        onClick={() => resendExcel(selectedOrder._id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Excel&apos;i Tekrar Gönder
                      </button>
                    )}
                    {selectedOrder.status !== 'İptal Edildi' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder._id, 'İptal Edildi')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
