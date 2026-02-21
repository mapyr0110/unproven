import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToPDF(data_, columns) {
  const doc = new jsPDF({
    orientation: columns.length > 6 ? 'landscape' : 'portrait', 
  });

  // Заголовок
  doc.setFontSize(18);
  doc.text('Users Report', 14, 20);

  // Дата
  doc.setFontSize(11);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString('ru-RU');
  doc.text(`Generated: ${today}`, 14, 30);

  // Таблица
  autoTable(doc, {
    head: [columns],
    body: data_.map(row => columns.map(col => String(row[col] ?? '—'))),
    startY: 38,
    styles: {
      fontSize: 7,          
      cellPadding: 2,
      overflow: 'linebreak', 
    },
    headStyles: {
      fillColor: [41, 128, 185],
      fontSize: 7,
      halign: 'center',
    },
    columnStyles: {
      // автоматически распределяем ширину
      ...columns.reduce((acc, _, i) => {
        acc[i] = { cellWidth: 'auto' };
        return acc;
      }, {}),
    },
    tableWidth: 'auto',
  });

  const year = new Date().getFullYear();
  doc.save(`report-${year}.pdf`);
}