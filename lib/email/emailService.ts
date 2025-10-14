import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@buyboxtr.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const getEmailTemplate = (type: string, data: Record<string, unknown>): string => {
  const baseStyle = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
      .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
    </style>
  `;

  switch (type) {
    case 'order_received':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 Siparişiniz Alındı!</h1>
            </div>
            <div class="content">
              <h2>Merhaba,</h2>
              <p>Harika bir karar verdiniz! E-ticarette devrim yaratacak verilerinize ulaşmanıza çok az kaldı.</p>
              
              <div class="highlight">
                <strong>Sipariş No:</strong> ${data.orderNumber}<br>
                <strong>Paket:</strong> ${data.packageName}<br>
                <strong>Tutar:</strong> ${data.amount} TL
              </div>

              <h3>Ödeme Bilgileri:</h3>
              <p><strong>Alıcı:</strong> ${process.env.BANK_ACCOUNT_NAME || 'BUYBOX TR TEKNOLOJİ A.Ş.'}</p>
              <p><strong>IBAN:</strong> ${process.env.BANK_IBAN || 'TRXX XXXX XXXX XXXX XXXX XXXX XX'}</p>
              <p><strong>Banka:</strong> ${process.env.BANK_NAME || 'Banka Adı'}</p>
              
              <div class="highlight">
                <strong>ÖNEMLİ:</strong> Ödeme yaparken açıklama kısmına mutlaka sipariş numaranızı (<strong>${data.orderNumber}</strong>) yazınız!
              </div>

              <p>Ödemeniz onaylandığı anda, altın değerindeki Excel listeniz e-posta adresinize gönderilecektir.</p>
            </div>
            <div class="footer">
              <p>© 2025 buyboxtr. Tüm hakları saklıdır.</p>
              <p>WhatsApp Destek: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+90 5XX XXX XX XX'}</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'account_created':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 buyboxtr'ye Hoş Geldiniz!</h1>
            </div>
            <div class="content">
              <h2>E-ticaretin geleceğine hoş geldiniz!</h2>
              <p>Artık siz de bir BuyboxTR üyesisiniz.</p>
              
              <div class="highlight">
                <strong>Kullanıcı Adı (E-posta):</strong> ${data.email}<br>
                <strong>Geçici Şifre:</strong> ${data.password}
              </div>

              <p>Güvenliğiniz için, ilk girişinizde şifrenizi değiştirmenizi öneriyoruz.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">HEMEN GİRİŞ YAP</a>
            </div>
            <div class="footer">
              <p>© 2025 buyboxtr. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'payment_confirmed':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Ödemeniz Onaylandı!</h1>
            </div>
            <div class="content">
              <h2>TEBRİKLER!</h2>
              <p>Ödemeniz tarafımıza ulaştı. Gelişmiş yapay zeka algoritmamız şu anda size özel, en kârlı Buybox ürün listesini hazırlamak için çalışmaya başladı.</p>
              
              <p>Bu işlem genellikle birkaç dakika sürer. Lütfen sabırlı olun, mucize yakında e-posta kutunuzda olacak!</p>

              <div class="highlight">
                <strong>Sipariş No:</strong> ${data.orderNumber}
              </div>
            </div>
            <div class="footer">
              <p>© 2025 buyboxtr. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'order_delivered':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎁 İŞTE HAZIR! Buybox Listeniz Geldi!</h1>
            </div>
            <div class="content">
              <h2>Bekleyiş sona erdi!</h2>
              <p>Rakiplerinizi geride bırakacak, size binlerce TL kazandıracak olan değerli Buybox listeniz ektedir.</p>
              
              <div class="highlight">
                <strong>Sipariş No:</strong> ${data.orderNumber}<br>
                <strong>Kategori Sayısı:</strong> ${data.categoryCount}
              </div>

              <p>Excel dosyası bu e-postaya eklenmiştir. Ayrıca kullanıcı panelinizden de dilediğiniz zaman indirebilirsiniz.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">LİSTEYİ PANELİMDEN İNDİR</a>

              <p>Sorularınız için WhatsApp destek hattımızdan bize ulaşabilirsiniz.</p>
            </div>
            <div class="footer">
              <p>© 2025 buyboxtr. Tüm hakları saklıdır.</p>
              <p>WhatsApp Destek: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+90 5XX XXX XX XX'}</p>
            </div>
          </div>
        </body>
        </html>
      `;

    case 'demo_excel':
      return `
        <!DOCTYPE html>
        <html>
        <head>${baseStyle}</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎁 Ücretsiz Demo Excel'iniz Hazır!</h1>
            </div>
            <div class="content">
              <h2>Buybox'ın Gücünü Keşfedin!</h2>
              <p>Yapay zekamız tarafından rastgele seçilmiş 10 farklı kategoriden en kârlı Buybox ürün linkleri ektedir.</p>
              
              <p>Bu sadece başlangıç! Tam paketlerimizle binlerce fırsata erişebilirsiniz.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/#paketler" class="button">PAKETLERİ İNCELE</a>
            </div>
            <div class="footer">
              <p>© 2025 buyboxtr. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    default:
      return '<p>Email content not found</p>';
  }
};
