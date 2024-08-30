export const VoiceLanguage = {
  ENGLISH: {
    code: 'en-US',
    index: 0,
  },
  PORTUGUESE: { code: 'pt-BR', index: 1 },
} as const;

export type VoiceLanguageKey = keyof typeof VoiceLanguage;
