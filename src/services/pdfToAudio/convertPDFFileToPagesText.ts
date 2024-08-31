import { MultipartFile } from '@fastify/multipart';
import { PDFExtract } from 'pdf.js-extract';

const pdfExtract = new PDFExtract();

export async function convertPDFFileToPagesText(pdfFile: MultipartFile) {
  const pdfBuffer = await pdfFile.toBuffer();
  const { pages } = await pdfExtract.extractBuffer(pdfBuffer);

  return pages.map(({ content }) =>
    content.map(({ str }) => (!str ? ' ' : str)).join(''),
  );
}
