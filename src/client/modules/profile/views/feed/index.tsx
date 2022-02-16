import React from 'react';

import { MoreHorizontal } from 'react-feather';
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
      <div className={styles.followers_container}>
        <article className={styles.gadgets}>
          <h4>Followers:</h4>
          <span>634</span>
          <button>
            <MoreHorizontal/>
          </button>
        </article>
        <div className={styles.followers_image}>
        <figure>
          <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
        <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
               <img
           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
           alt=""
           height={45}
           width={45} />
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
               alt=""
               height={45}
               width={45} />
        </figure>
      </div>
      </div>
    </div>
  );
}
