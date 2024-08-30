import AppError from 'errors/AppError';
import { z } from 'zod';
import { MultipartFile } from '@fastify/multipart';
import { VOICE_GENDER_KEYS } from 'constants/voiceGenderKeys';
import { VOICE_LANGUAGE_KEYS } from 'constants/voiceLanguageKeys';
import { handleSchemaValidation } from 'utils/handleSchemaValidation';
import { VoiceLanguageKey } from 'types/VoiceLanguage';
import { VoiceGender } from 'types/VoiceGender';
import { VOICES_DATA } from 'constants/voicesData';

type ObjectWithValue<T> = { value: T };
type PDFToAudioRequestData = {
  fields: {
    language: ObjectWithValue<VoiceLanguageKey>;
    gender: ObjectWithValue<VoiceGender>;
    voiceIndex: ObjectWithValue<number>;
  };
};

export function validatePDFToAudioSchema(
  requestData: MultipartFile | undefined,
) {
  if (!requestData) throw new AppError('Invalid or no pdf provided!');
  handleSchemaValidation(VALIDATION_SCHEMA, requestData);

  const {
    fields: { language, gender, voiceIndex },
  } = requestData as unknown as PDFToAudioRequestData;
  const { quantity } = VOICES_DATA[language.value][gender.value];

  if (voiceIndex.value < quantity) return;
  throw new AppError(
    `Invalid index for selected voice! Its last index is ${quantity - 1}.`,
  );
}

const VALIDATION_SCHEMA = z.object({
  fields: z.object({
    pdf: z.object({
      type: z.literal('file'),
      mimetype: z.literal('application/pdf'),
    }),
    language: z.object({ value: z.enum(VOICE_LANGUAGE_KEYS) }),
    gender: z.object({ value: z.enum(VOICE_GENDER_KEYS) }),
    voiceIndex: z.object({ value: z.coerce.number().int().nonnegative() }),
  }),
});
