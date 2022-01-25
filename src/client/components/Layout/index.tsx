import React from 'react';

import CreatePostModal from '../CreatePostModal';
import { useCreatePost } from '../../hooks/useCreatePost';

import Header from '../Header';

import styles from './Layout.module.css';

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const createPost = useCreatePost();

  return (
    <>
      <div className={styles.application}>
        <Header />
        <main className={styles.app_container}>{children}</main>
      </div>
      {createPost.isModalOpen && <CreatePostModal />}
    </>
  );
}
