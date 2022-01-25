import React from 'react';
import Link from 'next/link';
import { Send, Menu, Image, Info, Edit3 } from 'react-feather';

import Button from '../../../../components/Button';

import type { User } from '../../../../services/UserService';

import styles from './Profile.module.css';

export default function Profile({ profile }: { profile: User; }): JSX.Element {
  return (
    <div className={`safe-zone ${styles.container}`}>
      <div className={styles.background}>&nbsp;</div>
      <div className={styles.profile}>
        <article className={styles.user_resume}>
          <figure className={styles.avatar}>
            <img src="data:image/png;base64,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"
              alt="Profile image"
              height={150}
              width={150} />
          </figure>
          <p>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <span>Valencia, Venezuela</span>
          </p>
        </article>
        <div className={styles.user_actions}>
          <Button type="button" variant="primary">Follow</Button>
          <Button type="button" variant="secondary" icon><Send /></Button>
        </div>
      </div>
      <ul className={styles.navigation_tabs}>
        <li>
          <Link href={`/users/${profile.username}/`}>
            <div>
              <figure>
                <Menu />
              </figure>
              <span>Feed</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/users/${profile.username}/photos`}>
            <div>
              <figure>
                <Image />
              </figure>
              <span>Photos</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/users/${profile.username}/about`}>
            <div>
              <figure>
                <Info />
              </figure>
              <span>About</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/users/${profile.username}/edit`}>
            <div>
              <figure>
                <Edit3 />
              </figure>
              <span>Edit Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}