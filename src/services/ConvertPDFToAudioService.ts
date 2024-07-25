import parsePDF from 'pdf-parse';
import AppError from 'errors/AppError';
import { MultipartFile } from '@fastify/multipart';

export default class ConvertPDFToAudioService {
  public static async execute(fileData: MultipartFile | undefined) {
    if (!fileData) throw new AppError('Invalid or no PDF provided!');

    const isPDF = fileData.mimetype === 'application/pdf';
    if (!isPDF) throw new AppError('The provided file is not a PDF!');

    const fileBuffer = await fileData.toBuffer();
    const { text: pdfText } = await parsePDF(fileBuffer);

    return pdfText;
  }
}
