'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [copied, setCopied] = useState(false);

  const bankInfo = {
    accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'BUYBOX TR TEKNOLOJİ A.Ş.',
    iban: process.env.NEXT_PUBLIC_BANK_IBAN || 'TRXX XXXX XXXX XXXX XXXX XXXX XX',
    bankName: process.env.NEXT_PUBLIC_BANK_NAME || 'Banka Adı',
  };

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText(bankInfo.iban.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            SİPARİŞİNİZ BAŞARIYLA ALINMIŞTIR!
          </h1>
          <p className="text-2xl text-gray-600">
            KAZANÇ YOLCULUĞUNUZ BAŞLIYOR!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">TEBRİKLER!</h2>
            <p className="text-lg text-gray-700">
              Ödemenizi aşağıdaki GÜVENLİ IBAN adresine, sipariş numaranızı açıklama kısmına 
              EKSİKSİZ ve DOĞRU bir şekilde ekleyerek yapınız.
            </p>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Sipariş Numaranız:</h3>
              <span className="text-2xl font-mono font-bold text-purple-600">{orderNumber}</span>
            </div>
            <p className="text-sm text-purple-800">
              ⚠️ Ödeme yaparken açıklama kısmına mutlaka bu numarayı yazınız!
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-center">IBAN Bilgileri</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold text-gray-700">Alıcı Adı:</span>
                <span className="font-bold">{bankInfo.accountName}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold text-gray-700">IBAN:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg">{bankInfo.iban}</span>
                  <button
                    onClick={handleCopyIBAN}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
                  >
                    {copied ? '✓ Kopyalandı' : 'Kopyala'}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Banka:</span>
                <span className="font-bold">{bankInfo.bankName}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
            <h4 className="font-bold text-lg mb-2 flex items-center">
              <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ÖNEMLİ BİLGİLENDİRME
            </h4>
            <ul className="space-y-2 text-sm">
              <li>✓ Ödemeniz onaylandığı anda, altın değerindeki Excel listeniz ve buyboxtr hesap bilgileriniz anında e-posta adresinize gönderilecektir.</li>
              <li>✓ Ödeme açıklamasına sipariş numaranızı (<strong>{orderNumber}</strong>) yazmayı unutmayın!</li>
              <li>✓ Ödeme işlemi genellikle birkaç saat içinde onaylanır.</li>
              <li>✓ E-postanızı kontrol etmeyi unutmayın (spam klasörünü de kontrol edin).</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Destek ve Yardım</h3>
          <p className="text-gray-700 mb-4">
            Ödeme ile ilgili acil bir sorunuz mu var? Destek ekibimiz 7/24 yanınızda!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition inline-flex items-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Destek
            </a>
            <Link href="/dashboard" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
              Kullanıcı Paneli
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            buyboxtr
          </Link>
        </nav>
      </header>

      <Suspense fallback={<div className="text-center py-12">Yükleniyor...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
