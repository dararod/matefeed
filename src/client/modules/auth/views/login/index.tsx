import React from 'react';
import Link from 'next/link';

import LoginForm from '../../components/LoginForm';

import styles from './Login.module.css';

export default function Login(): JSX.Element {
  return (
    <main className={styles.signin_view}>
      <article className={styles.card}>
        <div className={styles.form_container}>
          <div className={styles.greeting_container}>
            <h1 className={styles.title_signin}>matefeed</h1>
            <span className={styles.greeting}>
              <h2>Log in</h2> to get in touch with your commmunity
            </span>
          </div>
          <LoginForm onSuccess={() => window.location.assign('/')} />
          <small className={styles.signup_message}>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </small>
        </div>
        <footer className={styles.footer}>
          <small>
            Matefeed is an open source and free to use software solution.
            <br />
            Contribute to the project via{' '}
            <a href="https://github.com/matefeed/matefeed" target="_blank">
              GitHub
            </a>
            .
          </small>
        </footer>
      </article>
    </main>
  );
}
