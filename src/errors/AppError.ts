import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { STATUS_CODES } from 'http';

export default class AppError {
  private static readonly INTERNAL_ERROR_MESSAGE = STATUS_CODES[
    INTERNAL_SERVER_ERROR
  ] as string;

  public readonly error: string;
  public readonly message: string;
  public readonly statusCode: number;

  public static readonly InternalServerErrorInstance = new AppError(
    AppError.INTERNAL_ERROR_MESSAGE,
    INTERNAL_SERVER_ERROR,
  );

  constructor(message: string, statusCode: number = BAD_REQUEST) {
    this.error = STATUS_CODES[statusCode] ?? AppError.INTERNAL_ERROR_MESSAGE;
    this.message = message;
    this.statusCode = statusCode;
  }
}
