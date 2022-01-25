import Link from 'next/link';
import React from 'react';
import { Edit } from 'react-feather';

import { useCreatePost } from '../../../hooks/useCreatePost';
import { useSession } from '../../../hooks/useSession';

import styles from './UserBar.module.css';

export default function UserBar(): JSX.Element {
  const createPost = useCreatePost();
  const { currentUser } = useSession();

  return (
    <div className={styles.userbar}>
      <button className={styles.action_button} onClick={createPost.openModal}>
        <Edit />
      </button>
      <Link href={`/users/${currentUser?.username}`}>
        <figure className={styles.avatar}>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Favatarbox.net%2Favatars%2Fimg22%2Fevil_elmo_avatar_picture_53655.jpg&f=1&nofb=1"
            height="50"
            width="50"
          />
        </figure>
      </Link>
    </div>
  );
}
