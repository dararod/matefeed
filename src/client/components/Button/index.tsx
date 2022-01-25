import React from 'react';
import classNames from 'classnames';
import { Loader } from 'react-feather';

import styles from './Button.module.css';

export default function Button({
  type,
  children,
  variant,
  icon,
  isLoading,
  isDisabled,
}: {
  type: 'button' | 'submit';
  children: JSX.Element[] | JSX.Element | string;
  variant?: 'primary' | 'secondary';
  icon?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}): JSX.Element {
  const className = classNames(styles.button, {
    [styles.primary]: variant === 'primary',
    [styles.secondary]: variant === 'secondary',
    [styles.icon]: icon,
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
