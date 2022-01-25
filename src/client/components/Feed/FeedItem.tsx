import React from 'react';
import { Heart, MoreHorizontal, MessageCircle, Share } from 'react-feather';

// import ImagePost from './ImagePost';

import type { Post } from '../../services/PostService';
import { humanTimeExpression } from '../../utils/date';

import styles from './Feed.module.css';

export default function FeedItem({
  text,
  createdAt,
  author,
}: Post): JSX.Element {
  return (
    <li className={styles.post}>
      <header>
        <div>
          <figure>
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
              alt=""
              height={45}
              width={45}
            />
          </figure>
          <article>
            <a className={styles.author_link} href={`/users/${author.username}`}>
              {author.firstName} {author.lastName}
            </a>
            <time>{humanTimeExpression(new Date(+createdAt))}</time>
          </article>
        </div>
        <button>
          <MoreHorizontal />
        </button>
      </header>
      <main className={styles.pictures_margin}>
        {text && <p>{text}</p>}
        {/*{pictures && <ImagePost pictures={pictures} />}*/}
      </main>
      <footer>
        <div className={styles.post_actions}>
          <button>
            <Heart />
            <span>Like</span>
          </button>
          <button>
            <MessageCircle />
            <span>Comment</span>
          </button>
          <button>
            <Share />
            <span>Share</span>
          </button>
        </div>
        <div className={styles.post_reactions}>
          <div>
            <figure>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
                alt=""
                height={30}
                width={30}
              />
            </figure>
            <figure>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
                alt=""
                height={30}
                width={30}
              />
            </figure>
            <figure>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F157%2F157302.jpg&f=1&nofb=1"
                alt=""
                height={30}
                width={30}
              />
            </figure>
          </div>
          <p>
            Liked by <strong>David Rodríguez</strong> and{' '}
            <strong>10 more</strong>
          </p>
        </div>
      </footer>
    </li>
  );
}
