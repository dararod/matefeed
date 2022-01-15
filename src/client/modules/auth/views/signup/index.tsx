import React, { useState } from 'react';
import Link from 'next/link';

import SignUpForm from '../../components/SignUpForm';

import styles from './SignUp.module.css';

export default function SignUp(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<'register' | 'success'>(
    'register',
  );

  return (
    <main className={styles.signup_view}>
      <article className={styles.card}>
        <div className={styles.form_container}>
          <div className={styles.greeting_container}>
            <span className={styles.greeting}>
              <h2>Sign up</h2> to join communities and meet people
            </span>
          </div>
          {currentStep === 'register' ? (
            <>
              <SignUpForm onSucces={() => setCurrentStep('success')} />
              <small className={styles.login_message}>
                Already have an account? <Link href="/login">Log in</Link>
              </small>
            </>
          ) : (
            <article>Welcome to matefeed!</article>
          )}
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
