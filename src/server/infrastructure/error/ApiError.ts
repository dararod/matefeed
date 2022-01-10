import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FastifyReply } from 'fastify';

export class ApiError extends Error {
  protected httpStatusCode: StatusCodes;
  private underlyingError: Error;
  private underlyingErrorMessage: string;
  private extra: Record<string, unknown>;

  protected constructor(
    message: string,
    underlyingError?: Error,
    httpStatusCode?: StatusCodes,
  ) {
    super(message);

    if (httpStatusCode) {
      this.httpStatusCode = httpStatusCode;
    } else {
      this.httpStatusCode = 500;
    }

    this.name = underlyingError
      ? `ApiError[${underlyingError.name}]`
      : `ApiError`;
    this.stack = underlyingError?.stack || 'N/A';
    this.underlyingError = underlyingError;
    this.underlyingErrorMessage = underlyingError?.message || 'N/A';
    this.extra = {};
  }

  public static fromMessage(message: string): ApiError {
    return new ApiError(message);
  }

  public appendExtra(key: string, value: unknown): ApiError {
    this.extra[key] = value;

    return this;
  }

  public toHttp(): Record<string, unknown> {
    let error: Record<string, unknown> = {
      status: this.httpStatusCode,
      statusCode: this.httpStatusCode,
    };

    if (Object.keys(this.extra).length) {
      error = {
        ...error,
        ...this.extra,
      };
    }

    if (process.env.NODE_ENV !== 'production') {
      error = {
        ...error,
        dev: {
          underlyingErrorMessage: this.underlyingErrorMessage,
          underlyingErrorStackTrace: this.stack,
        },
      };
    }

    return {
      ...error,
      status: getReasonPhrase(this.httpStatusCode),
      statusCode: this.httpStatusCode,
      message: this.message,
    };
  }

  public reply(reply: FastifyReply): FastifyReply {
    return reply.status(this.httpStatusCode).send(this.toHttp());
  }
}
