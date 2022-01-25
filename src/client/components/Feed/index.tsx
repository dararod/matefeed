import React from 'react';

import FeedItem from './FeedItem';

import type { Post } from '../../services/PostService';

import styles from './Feed.module.css';

export default function Feed({
  posts
}: {
  posts: Post[]
}): JSX.Element {
  return (
    <ul className={styles.feed}>
      {posts?.map((post) => (
        <FeedItem key={post.id} {...post} />
      ))}
    </ul>
  );
}
