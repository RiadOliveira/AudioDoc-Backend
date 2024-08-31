import { TTSRequest } from './TTSRequest';

export type PDFToAudioRequest = Omit<TTSRequest, 'text'> & {
  fileName: string;
  pagesText: string[];
};
