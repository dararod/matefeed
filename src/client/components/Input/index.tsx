import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.css';

export default function Input({
  type,
  placeholder,
  name,
  value,
  error,
  fullWidth,
  onBlur,
  onChange,
}: {
  type: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  fullWidth?: boolean;
  onBlur?(e: React.FocusEvent<unknown>): void;
  onChange(e: React.ChangeEvent<unknown>): void;
}): JSX.Element {
  const className = classNames(styles.input, {
    [styles.input_error]: error,
    [styles.full_width]: fullWidth,
  });

  const wrapperClassNames = classNames(styles.input_wrapper, {
    [styles.full_width]: fullWidth,
  });

  const containerClassNames = classNames(styles.input_container, {
    [styles.full_width]: fullWidth,
  });

  return (
    <div className={wrapperClassNames}>
      <div className={containerClassNames}>
        <input
          id={name}
          type={type}
          name={name}
          className={className}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
        />
        {error && (
          <figure className={styles.icon_error_icon_container}>
            <svg
              className={styles.input_error_icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </figure>
        )}
      </div>
      {error && <p className={styles.input_error_message}>{error}</p>}
    </div>
  );
}
