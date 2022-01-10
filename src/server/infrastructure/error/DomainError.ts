import { StatusCodes } from 'http-status-codes';

import { ApiError } from './ApiError';

export class DomainError extends ApiError {
  private constructor(message: string, httpStatusCode: StatusCodes) {
    super(message, undefined, httpStatusCode);
  }

  public static withMessage(
    message: string,
    httpStatusCode?: StatusCodes,
  ): DomainError {
    if (!httpStatusCode) {
      return new DomainError(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }

    return new DomainError(message, httpStatusCode);
  }
}
