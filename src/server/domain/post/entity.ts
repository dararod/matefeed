import type { User } from "../user";

export interface Post {
  id: string;
  author: User;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
