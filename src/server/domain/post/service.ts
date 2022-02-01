import { PostRepository } from './repository';
import { DomainError } from '../../infrastructure/error/DomainError';

import type { Post } from './entity';
import type { CreatePost } from './dto';
import type { UserService } from '../user';

export class PostService {
  private repository: PostRepository;
  private userService: UserService;

  constructor(repository: PostRepository, userService: UserService) {
    this.repository = repository;
    this.userService = userService;
  }

  public async create(post: CreatePost): Promise<Post> {
    const user = await this.userService.findById(post.authorId);

    if (!user) {
      throw DomainError.withMessage('Invalid user ID provided', 400);
    }

    const created = await this.repository.add(post);

    return {
      ...created,
      author: user,
    }
  }

  public async findById(id: string): Promise<Post | null> {
    const post = await this.repository.findOne({
      id,
    });

    if (post) {
      const author = await this.userService.findById(post.authorId);

      return {
        ...post,
        author
      }
    }

    return null;
  }

  public async findByAuthorId(authorId: string): Promise<Post[]> {
    const user = await this.userService.findById(authorId);

    if (!user) {
      throw DomainError.withMessage('Invalid user ID provided', 400);
    }

    const posts = await this.repository.findWhere({
      authorId: user.id,
    });

    return posts.map((data) => ({
      ...data,
      author: user,
    }));
  }
}
