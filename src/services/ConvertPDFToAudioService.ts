import { MultipartFile } from '@fastify/multipart';
import AppError from 'errors/AppError';

export default class ConvertPDFToAudioService {
  public static async execute(pdfData: MultipartFile | undefined) {
    if (pdfData == undefined) throw new AppError('Invalid or no PDF provided!');
  }
}
