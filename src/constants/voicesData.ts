import { VoiceGender } from 'types/VoiceGender';
import { VoiceLanguageKey } from 'types/VoiceLanguage';

const ENGLISH_MALE_NAMES = [
  'Casual-K',
  'Journey-D',
  'Neural2-A',
  'Neural2-D',
  'Neural2-I',
  'Neural2-J',
  'News-N',
  'Polyglot-1',
  'Standard-A',
  'Standard-B',
  'Standard-D',
  'Standard-I',
  'Standard-J',
  'Studio-Q',
  'Wavenet-A',
  'Wavenet-B',
  'Wavenet-D',
  'Wavenet-I',
  'Wavenet-J',
];
const ENGLISH_FEMALE_NAMES = [
  'Journey-F',
  'Journey-O',
  'Neural2-C',
  'Neural2-E',
  'Neural2-F',
  'Neural2-G',
  'Neural2-H',
  'News-K',
  'News-L',
  'Standard-C',
  'Standard-E',
  'Standard-F',
  'Standard-G',
  'Standard-H',
  'Studio-O',
  'Wavenet-C',
  'Wavenet-E',
  'Wavenet-F',
  'Wavenet-G',
  'Wavenet-H',
];
const PORTUGUESE_MALE_NAMES = [
  'Neural2-B',
  'Standard-B',
  'Standard-E',
  'Wavenet-B',
  'Wavenet-E',
];
const PORTUGUESE_FEMALE_NAMES = [
  'Neural2-A',
  'Neural2-C',
  'Standard-A',
  'Standard-C',
  'Standard-D',
  'Wavenet-A',
  'Wavenet-C',
  'Wavenet-D',
];

type VoicesData = {
  [key in VoiceLanguageKey]: {
    [key in VoiceGender]: { names: string[]; quantity: number };
  };
};

export const VOICES_DATA: VoicesData = {
  ENGLISH: {
    MALE: {
      names: ENGLISH_MALE_NAMES,
      quantity: ENGLISH_MALE_NAMES.length,
    },
    FEMALE: {
      names: ENGLISH_FEMALE_NAMES,
      quantity: ENGLISH_FEMALE_NAMES.length,
    },
  },
  PORTUGUESE: {
    MALE: {
      names: PORTUGUESE_MALE_NAMES,
      quantity: PORTUGUESE_MALE_NAMES.length,
    },
    FEMALE: {
      names: PORTUGUESE_FEMALE_NAMES,
      quantity: PORTUGUESE_FEMALE_NAMES.length,
    },
  },
} as const;
