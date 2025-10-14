import ExcelJS from 'exceljs';

export interface ProductData {
  url: string;
  category: string;
  price?: number;
  sellerCount?: number;
  platform: string;
  lastScannedAt: Date;
}

export const generateExcelFile = async (products: ProductData[]): Promise<Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Buybox Fırsatları');

  // Define columns with styling
  worksheet.columns = [
    { header: 'Ürün URL', key: 'url', width: 80 },
    { header: 'Kategori', key: 'category', width: 25 },
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Fiyat (TL)', key: 'price', width: 15 },
    { header: 'Satıcı Sayısı', key: 'sellerCount', width: 15 },
    { header: 'Son Tarama', key: 'lastScanned', width: 20 },
  ];

  // Style the header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF667eea' },
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 30;

  // Add data rows
  products.forEach((product) => {
    const row = worksheet.addRow({
      url: product.url,
      category: product.category,
      platform: product.platform,
      price: product.price || 'N/A',
      sellerCount: product.sellerCount || 'N/A',
      lastScanned: product.lastScannedAt.toLocaleString('tr-TR'),
    });

    // Style data rows
    row.alignment = { vertical: 'middle' };
    
    // Make URL clickable
    const urlCell = row.getCell('url');
    urlCell.value = {
      text: product.url,
      hyperlink: product.url,
    };
    urlCell.font = { color: { argb: 'FF0000FF' }, underline: true };
  });

  // Auto-filter
  worksheet.autoFilter = {
    from: 'A1',
    to: `F${products.length + 1}`,
  };

  // Freeze the header row
  worksheet.views = [
    { state: 'frozen', ySplit: 1 },
  ];

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
};
