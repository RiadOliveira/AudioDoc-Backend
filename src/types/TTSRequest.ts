import { VoiceGender } from './VoiceGender';
import { VoiceLanguageKey } from './VoiceLanguage';

export type TTSRequest = {
  text: string;
  language: VoiceLanguageKey;
  gender: VoiceGender;
  voiceIndex: number;
};
