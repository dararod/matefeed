import { StatusCodes } from 'http-status-codes';

import { ApiError } from './ApiError';

export class RepositoryError extends ApiError {
  private constructor(message: string, httpStatusCode: StatusCodes) {
    super(message, undefined, httpStatusCode);
  }

  public static fromDatabaseError(
    error: Record<string, string>,
  ): RepositoryError | void {
    // TODO: Find a way to check if the instance of `err` is `DatabaseError`
    if (error.code === '23505') {
      return new RepositoryError(error.detail, StatusCodes.BAD_REQUEST);
    }

    if (error.code === '42P01') {
      return new RepositoryError(
        'Database misconfiguration, missing tables',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // This is an unhandled database error, you must add it to this switch
    console.error(error);
    return new RepositoryError(error.detail, StatusCodes.IM_A_TEAPOT);
  }
}
