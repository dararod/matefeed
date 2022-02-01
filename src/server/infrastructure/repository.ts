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

  public async findOne(
    where: Partial<T> | { [key: string]: unknown },
  ): Promise<T | null> {
    try {
      const row = await this.database(this.tableName).where(where).first();

      return row;
    } catch (err) {
      throw RepositoryError.fromDatabaseError(err);
    }
  }

  public async findWhere(where: Partial<T> | { [key: string]: unknown }): Promise<T[]> {
    try {
      const rows = await this.database(this.tableName).where(where);

      return rows;
    } catch (err) {
      throw RepositoryError.fromDatabaseError(err);
    }
  }

  public async update(
    data: Partial<T> | { [key: string]: unknown },
    where: Partial<T> | { [key: string]: unknown },
  ): Promise<void> {
    try {
      await this.database(this.tableName).update(data).where(where);
    } catch (err) {
      throw RepositoryError.fromDatabaseError(err);
    }
  }
}
