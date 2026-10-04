import type { Checklist } from '@/services/api';
import { COMPANY } from '@/data/company';

type Meta = {
  applicantName?: string;
  destination?: string;
  purpose?: string;
};

/**
 * Generates and downloads a one-page PDF document checklist.
 * `jspdf` is imported dynamically so it never weighs down the initial bundle.
 */
export async function downloadChecklistPdf(checklist: Checklist, meta: Meta = {}) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin + 10;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  /* Header */
  doc.setFillColor(10, 20, 40);
  doc.rect(0, 0, pageWidth, 86, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text(COMPANY.name, margin, 40);  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`${checklist.label} — Document Checklist`, margin, 60);

  y = 116;

  /* Applicant details */
  doc.setTextColor(31, 36, 49);
  doc.setFontSize(10);
  if (meta.applicantName) {
    doc.text(`Applicant: ${meta.applicantName}`, margin, y);
    y += 16;
  }
  if (meta.destination) {
    doc.text(`Destination: ${meta.destination}`, margin, y);
    y += 16;
  }
  if (meta.purpose) {
    doc.text(`Purpose: ${meta.purpose}`, margin, y);
    y += 16;
  }
  y += 6;

  /* Items */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('General checklist', margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  checklist.items.forEach((item, i) => {
    const lines = doc.splitTextToSize(item, maxWidth - 26) as string[];
    ensureSpace(lines.length * 14 + 8);

    doc.setDrawColor(150, 160, 180);
    doc.rect(margin, y - 8, 9, 9);
    doc.setTextColor(60, 66, 80);
    doc.text(`${i + 1}.`, margin + 16, y);
    doc.text(lines, margin + 34, y);
    y += lines.length * 14 + 8;
  });

  /* Disclaimer */
  ensureSpace(80);
  y += 8;
  doc.setFillColor(248, 244, 235);
  const disclaimer = `${checklist.note} This document is provided for general informational purposes only and does not constitute legal or immigration advice. Verify current requirements with the relevant government or immigration authority.`;
  const disclaimerLines = doc.splitTextToSize(disclaimer, maxWidth - 20) as string[];
  const boxHeight = disclaimerLines.length * 12 + 18;
  doc.rect(margin, y, maxWidth, boxHeight, 'F');
  doc.setTextColor(120, 80, 20);
  doc.setFontSize(8.5);
  doc.text(disclaimerLines, margin + 10, y + 16);
  y += boxHeight + 14;

  /* Footer note */
  doc.setTextColor(140, 145, 155);
  doc.setFontSize(8);
  doc.text('Generated from www.example.com — replace with your production domain.', margin, pageHeight - 24);

  const filename = `${checklist.visaType}-checklist${meta.destination ? `-${meta.destination.toLowerCase().replace(/\s+/g, '-')}` : ''}.pdf`;
  doc.save(filename);
}
