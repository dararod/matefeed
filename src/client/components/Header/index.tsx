import React from 'react';

import NavLink from './NavLink';
import UserBar from './UserBar';

import styles from './Header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={`${styles.header_safe_zone} safe-zone`}>
        <h1>matefeed</h1>
        <nav>
          <ul>
            <li>
              <NavLink href="/">🔮&nbsp;Feed</NavLink>
            </li>
          </ul>
        </nav>
        <UserBar />
      </div>
    </header>
  );
}
