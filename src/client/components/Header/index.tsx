import React from 'react';

import NavLink from './NavLink';
import UserBar from './UserBar';

import styles from './Header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <h1>matefeed&nbsp;🧉</h1>
      <nav>
        <ul>
          <li>
            <NavLink href="/">🔮 Feed</NavLink>
          </li>
          <li>
            <NavLink href="/hot">🔥 Hottest</NavLink>
          </li>
        </ul>
      </nav>
      <UserBar />
    </header>
  );
}
