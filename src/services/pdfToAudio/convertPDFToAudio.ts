import parsePDF from 'pdf-parse';
import AppError from 'errors/AppError';
import { z } from 'zod';
import { MultipartFile } from '@fastify/multipart';
import { VOICE_LANGUAGE_KEYS } from 'constants/voiceLanguageKeys';

export async function convertPDFToAudio() {
  const fileBuffer = await requestData.toBuffer();
  const { text } = await parsePDF(fileBuffer);

  return text;
}
