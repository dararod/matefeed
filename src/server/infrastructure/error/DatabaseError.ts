import { StatusCodes } from 'http-status-codes';

import { ApiError } from './ApiError';

export class DatabaseError extends ApiError {
  private constructor(message: string, httpStatusCode: StatusCodes) {
    super(message, undefined, httpStatusCode);
  }

  public static from(
    error: Record<string, string>,
  ): DatabaseError | void {
    // TODO: Find a way to check if the instance of `err` is `Knex.DatabaseError`
    if (error.code === '23505') {
      return new DatabaseError(error.detail, StatusCodes.BAD_REQUEST);
    }

    if (error.code === '42P01') {
      return new DatabaseError(
        'Database misconfiguration, missing tables',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    if (error.code === '22007') {
      return new DatabaseError(
        'Invalid Date/Time format',
        StatusCodes.BAD_REQUEST,
      );
    }

    // This is an unhandled database error, you must add it to this switch
    console.error(error);
    return new DatabaseError(error.detail, StatusCodes.IM_A_TEAPOT);
  }
}
