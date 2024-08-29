import AppError from 'errors/AppError';
import textToSpeech from '@google-cloud/text-to-speech';
import { VOICES_NAMES } from 'constants/VoicesNames';
import { TTSRequest } from 'types/TTSRequest';
import { VoiceLanguage } from 'types/VoiceLanguage';

export default class TTSClientService {
  private static readonly TTS_CLIENT = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.TTS_API_KEY,
  });

  public static async execute({
    text,
    language,
    gender,
    voiceIndex,
  }: TTSRequest) {
    const { names, quantity } = VOICES_NAMES[language][gender];

    const invalidIndex = voiceIndex < 0 || voiceIndex >= quantity;
    if (invalidIndex) throw new AppError('Invalid voice index provided!');

    const languageCode = VoiceLanguage[language];
    const name = `${languageCode}-${names[voiceIndex]}`;
    const [response] = await this.TTS_CLIENT.synthesizeSpeech({
      input: { text },
      voice: { languageCode, name },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const invalidResponse = !response || !response.audioContent;
    if (invalidResponse) throw AppError.InternalServerErrorInstance;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return response.audioContent!;
  }
}
