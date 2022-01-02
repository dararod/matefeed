import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Header.module.css';

export default function NavLink({
  children,
  href,
}: {
  children: string | JSX.Element;
  href: string;
}): JSX.Element {
  const router = useRouter();
  const className = `${styles.link} ${
    router.pathname === href ? styles.link_active : undefined
  }`;

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
}
