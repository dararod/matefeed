import React from 'react';
import classNames from 'classnames';
import { Loader } from 'react-feather';

import styles from './Button.module.css';

export default function Button({
  type,
  children,
  variant,
  isLoading,
  isDisabled,
}: {
  type: 'button' | 'submit';
  children: JSX.Element[] | JSX.Element | string;
  variant?: 'primary';
  isLoading?: boolean;
  isDisabled?: boolean;
}): JSX.Element {
  const className = classNames(styles.button, {
    [styles.primary]: variant === 'primary',
  });

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled || isLoading}
    >
      {children}
      {isLoading && <Loader className={styles.loader} />}
    </button>
  );
}
