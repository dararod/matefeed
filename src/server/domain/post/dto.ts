import { Type, Static } from '@sinclair/typebox';

export const PostsTableRowDto = Type.Object({
  id: Type.String(),
  text: Type.String(),
  authorId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export type PostsTableRow = Static<typeof PostsTableRowDto>;

export const CreatePostDto = Type.Object({
  authorId: Type.String(),
  text: Type.String(),
});

export type CreatePost = Static<typeof CreatePostDto>;
