import React from 'react';
import { Edit } from 'react-feather';

import { useCreatePost } from '../../../hooks/useCreatePost';

import styles from './UserBar.module.css';

export default function UserBar(): JSX.Element {
  const createPost = useCreatePost();

  return (
    <div className={styles.userbar}>
      <button className={styles.action_button} onClick={createPost.openModal}>
        <Edit />
      </button>
      <figure className={styles.avatar}>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Favatarbox.net%2Favatars%2Fimg22%2Fevil_elmo_avatar_picture_53655.jpg&f=1&nofb=1"
          height="50"
          width="50"
        />
      </figure>
    </div>
  );
}
