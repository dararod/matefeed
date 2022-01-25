import { DatabaseError } from '../../infrastructure/error/DatabaseError';
import { DomainError } from '../../infrastructure/error/DomainError';

import type { Knex } from 'knex';
import type { Post } from './entity';
import type { CreatePost } from './dto';
import type { UserService } from '../user';

export class PostService {
  private database: Knex;
  private userService: UserService;

  constructor(database: Knex, userService: UserService) {
    this.database = database;
    this.userService = userService;
  }

  public async create(post: CreatePost): Promise<Post> {
    try {
      const author = await this.userService.findById(post.authorId);

      if (!author) {
        throw DomainError.withMessage('Invalid user ID provided', 400);
      }

      const [row] = await this.database('posts').insert(post).returning('*');

      return {
        ...row,
        author,
      } as unknown as Post;
    } catch (err) {
      throw DatabaseError.from(err);
    }
  }

  public async findAll(): Promise<Post[]> {
    try {
      const rows = await this.database('posts').select(
        '*',
        'posts.id as post_id',
        'users.id as user_id',
        'users.created_at as user_created_at',
        'users.updated_at as user_updated_at',
        'posts.created_at as post_created_at',
        'posts.updated_at as post_updated_at',
      ).leftJoin('users', 'posts.author_id', 'users.id')
        .orderBy('posts.createdAt', 'desc');

      const records = rows.map((row) => ({
        id: row.postId,
        text: row.text,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        author: {
          id: row.userId,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          username: row.username,
          birthdate: row.birthdate,
          createdAt: row.userCreatedAt,
          updatedAt: row.userUpdatedAt,
        }
      }));

      return records;
    } catch (err) {
      throw DatabaseError.from(err);
    }
  }

  public async findById(id: string): Promise<Post> {
    try {
      const rows = await this.database('posts').where({
        id,
      });

      if (rows.length) {
        const post = rows[0];
        const author = await this.userService.findById(post.authorId);

        delete post.authorId;

        post.author = author;

        return post;
      }

      return null;
    } catch (err) {
      throw DatabaseError.from(err);
    }
  }

  public async findByAuthorId(authorId: string): Promise<Post[]> {
    try {
      const author = await this.userService.findById(authorId);

      if (!author) {
        throw DomainError.withMessage('Invalid username provided', 400);
      }

      const rows = await this.database('posts').select('posts.*').leftJoin('users', 'posts.author_id', 'users.id')
        .where('users.id', author.id).orderBy('posts.createdAt', 'desc');

      return rows.map((post) => {
        delete post.authorId;

        return {
          ...post,
          author,
        }
      });
    } catch (err) {
      throw DatabaseError.from(err);
    }
  }

  public async findByUsername(username: string): Promise<Post[]> {
    try {
      const author = await this.userService.findByUsername(username);

      if (!author.length) {
        throw DomainError.withMessage('Invalid username provided', 400);
      }

      const rows = await this.database('posts').select('posts.*').leftJoin('users', 'posts.author_id', 'users.id')
        .where('users.username', username).orderBy('posts.createdAt', 'desc');

      return rows.map((post) => {
        delete post.authorId;

        return {
          ...post,
          author: author[0],
        }
      });
    } catch (err) {
      throw DatabaseError.from(err);
    }
  }
}
