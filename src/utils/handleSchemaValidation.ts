import AppError from 'errors/AppError';
import { Schema, ZodError } from 'zod';

export function handleSchemaValidation(schema: Schema, data: unknown) {
  try {
    schema.parse(data);
  } catch (error) {
    const { code, path, message } = (error as ZodError).errors[0];
    const fieldName = path[path.length - 1];

    const errorMessage = `Validation error: field '${fieldName}' has ${code}. It was ${message}.`;
    throw new AppError(errorMessage);
  }
}
