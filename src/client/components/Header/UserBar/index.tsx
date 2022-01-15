import React from 'react';

import { useCreatePost } from '../../../hooks/useCreatePost';

import styles from './UserBar.module.css';

import CreatePost from '../../icons/CreatePost';

export default function UserBar(): JSX.Element {
  const createPost = useCreatePost();

  return (
    <div className={styles.userbar}>
      <button className={styles.action_button} onClick={createPost.openModal}>
        <CreatePost className={styles.create_post_icon} />
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
