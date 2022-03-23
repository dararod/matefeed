import React from 'react';
import Link from 'next/link';

export default function Profile({ children, label, href }: { children: JSX.Element; label: string; href: string; }): JSX.Element {
  return (
    <li>
      <Link href={href}>
        <div>
          <figure>
            {children}
          </figure>
          <span>{label}</span>
        </div>
      </Link>
    </li>
  );
}
