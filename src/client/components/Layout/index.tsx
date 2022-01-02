import React from 'react';

import Header from '../Header';

import styles from './Layout.module.css';

export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className={styles.application}>
      <Header />
      <main className={styles.app_container}>{children}</main>
    </div>
  );
}
