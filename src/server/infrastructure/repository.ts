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

  public async findAll(): Promise<T[]> {
    try {
      const rows = await this.database(this.tableName).select();

      return rows;
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

  public async findJoin(joinStatement: string, where?: { field: string, value: string | number }, orderBy?: string): Promise<T[]> {
    // TODO: Do something about this horrible thing
    try {
      const query = this.database(this.tableName).select(`${this.tableName}.*`)
        .joinRaw(joinStatement);

      if (where) {
        if (orderBy) {
          return await query.where(where.field, where.value).orderBy(orderBy);
        }

        return await query.where(where.field, where.value);
      }

      return await query;
    } catch (err) {
      throw RepositoryError.fromDatabaseError(err);
    }
  }
}
