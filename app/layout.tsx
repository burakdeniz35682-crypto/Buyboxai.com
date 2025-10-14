import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "buyboxtr - E-Ticaret Buybox Takip Sistemi",
  description: "Trendyol ve diğer pazaryerlerinde Buybox fırsatlarını yakalayın. Satışlarınızı binlerce kat artırın!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
