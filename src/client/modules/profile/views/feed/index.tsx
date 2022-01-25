import React from 'react';

import Feed from '../../../../components/Feed';
import { Post } from '../../../../services/PostService';

import CreatePost from '../../components/CreatePost';

import styles from './Feed.module.css';

export default function UserFeed({ posts }: { posts: Post[]; }): JSX.Element {
  return (
    <div className={styles.feed}>
      <div className={styles.posts_list}>
        <CreatePost/>
        <Feed posts={posts} />
      </div>
      <article>
        FollowMe
      </article>
    </div>
  );
}
