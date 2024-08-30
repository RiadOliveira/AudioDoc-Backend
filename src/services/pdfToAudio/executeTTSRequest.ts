import AppError from 'errors/AppError';
import textToSpeech from '@google-cloud/text-to-speech';
import { TTSRequest } from 'types/TTSRequest';
import { VoiceLanguage } from 'types/VoiceLanguage';
import { VOICES_DATA } from 'constants/voicesData';

const TTS_CLIENT = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.TTS_API_KEY,
});

export async function executeTTSRequest({
  text,
  language,
  gender,
  voiceIndex,
}: TTSRequest) {
  const { names } = VOICES_DATA[language][gender];

  const { code: languageCode } = VoiceLanguage[language];
  const name = `${languageCode}-${names[voiceIndex]}`;
  const [response] = await TTS_CLIENT.synthesizeSpeech({
    input: { text },
    voice: { languageCode, name },
    audioConfig: { audioEncoding: 'MP3' },
  });

  const invalidResponse = !response || !response.audioContent;
  if (invalidResponse) throw AppError.InternalServerErrorInstance;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return response.audioContent!;
}
