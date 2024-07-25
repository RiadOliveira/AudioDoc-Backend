import { BAD_REQUEST } from 'http-status';
import { STATUS_CODES } from 'http';

export default class AppError {
  public readonly error: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = BAD_REQUEST) {
    this.error = STATUS_CODES[statusCode] ?? 'Internal Server Error';
    this.message = message;
    this.statusCode = statusCode;
  }
}
