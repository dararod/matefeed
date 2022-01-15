import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

export default function Button({
  type,
  children,
  variant,
}: {
  type: 'button' | 'submit';
  children: JSX.Element[] | JSX.Element | string;
  variant?: 'primary';
}): JSX.Element {
  const className = classNames(styles.button, {
    [styles.primary]: variant === 'primary',
  });

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
