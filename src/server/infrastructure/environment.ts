export class MissingEnvironmentVariable extends Error {
  constructor(key: string) {
    super(`Missing the "${key}" environment variable.`);

    this.name = 'MissingEnvironmentVariable';
  }
}

/**
 * Retrieves an environment variable from `process.env`. If the
 * environment variable is not present, then throws an exception.
 */
export function getEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new MissingEnvironmentVariable(key);
  }

  return process.env[key];
}
