import React from 'react';

import Feed from '../../../../components/Feed';
import { Post } from '../../../../services/PostService';
import FollowersBox from '../../components/FollowersBox';
import FollowingBox from '../../components/Following';

import CreatePostProfile from '../../components/CreatePost';

import styles from './Feed.module.css';

export default function UserFeed({ posts }: { posts: Post[]; }): JSX.Element {
  return (
    <div className={styles.feed}>
      <div className={styles.posts_list}>
        <CreatePostProfile/>
        <Feed posts={posts} />
      </div>
      <FollowersBox/>
    </div>
  );
}
