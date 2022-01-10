import { RepositoryError } from './error/RepositoryError';

import type { Knex } from 'knex';

export abstract class Repository<T> {
  protected database: Knex;
  private tableName: string;

  constructor(database: Knex, tableName: string) {
    this.database = database;
    this.tableName = tableName;
  }

  public async add(data: unknown): Promise<T> {
    try {
      const [row] = await this.database(this.tableName)
        .insert(data)
        .returning('*');

      return row;
    } catch (err) {
      throw RepositoryError.fromDatabaseError(err);
    }
  }
}
