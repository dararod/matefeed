import { Repository } from '../../infrastructure/repository';

import type { Knex } from 'knex';
import type { PostsTableRow } from './dto';

export class PostRepository extends Repository<PostsTableRow> {
  constructor(database: Knex) {
    super(database, 'posts');
  }
}
