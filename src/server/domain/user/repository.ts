import { Repository } from '../../infrastructure/repository';

import type { Knex } from 'knex';
import type { User } from './entity';

export class UserRepository extends Repository<User> {
  constructor(database: Knex) {
    super(database, 'users');
  }

  public async add(payload: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    birthday: Date;
    passwordHash: string;
  }): Promise<User> {
    return super.add(payload);
  }
}
