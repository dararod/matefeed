import { useContext } from 'react';

import { CreatePostContext } from '../contexts/CreatePost';

import type { CreatePostContextValue } from '../contexts/CreatePost';

export function useCreatePost(): CreatePostContextValue {
  const value = useContext(CreatePostContext);

  return value;
}
