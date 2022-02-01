import type { User } from '../user/entity';

export interface Post {
  id: string;
  author: User;
  text: string;
}
