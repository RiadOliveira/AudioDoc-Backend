import { VoiceGender } from './VoiceGender';
import { VoiceLanguageKey } from './VoiceLanguage';

export type TTSRequest = {
  fileName: string;
  text: string;
  language: VoiceLanguageKey;
  gender: VoiceGender;
  voiceIndex: number;
};
