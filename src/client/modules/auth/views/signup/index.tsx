import React from 'react';

import SignUpForm from '../../components/SignUpForm';

import styles from './SignUp.module.css';

export default function SignUp(): JSX.Element {
  return (
    <main className={styles.signup_view}>
      <article className={styles.card}>
        <div className={styles.form_container}>
          <div className={styles.greeting_container}>
            <span className={styles.greeting}>
              <h2>Sign up</h2> to join communities and meet people
            </span>
          </div>
          <SignUpForm onSucces={() => console.log('User Created')} />
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
