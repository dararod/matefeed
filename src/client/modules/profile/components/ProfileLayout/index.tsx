import React from 'react';

import Layout from '../../../../components/Layout';
import Profile from '../Profile';

import type { User } from '../../../../services/UserService';

import styles from './ProfileLayout.module.css';

export default function ProfileLayout({ children, profile, }: { children: JSX.Element; profile: User; }): JSX.Element {
  return (
    <Layout>
      <Profile profile={profile} />
      <main className={`safe-zone ${styles.content}`}>
        {children}
      </main>
    </Layout>
  );
}
