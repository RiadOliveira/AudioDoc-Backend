export const VoiceLanguage = {
  ENGLISH: 'en-US',
  PORTUGUESE: 'pt-BR',
} as const;

export type VoiceLanguageKey = keyof typeof VoiceLanguage;
