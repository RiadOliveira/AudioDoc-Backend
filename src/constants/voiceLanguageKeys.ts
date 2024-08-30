import { VoiceLanguage } from 'types/VoiceLanguage';

export const VOICE_LANGUAGE_KEYS = Object.keys(
  VoiceLanguage,
) as unknown as readonly [string, ...string[]];
