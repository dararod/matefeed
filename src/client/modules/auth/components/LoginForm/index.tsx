import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import styles from './LoginForm.module.css';

export default function LoginForm(): JSX.Element {
  const { handleChange, handleSubmit, handleBlur, errors, values } = useFormik<{
    userId: string;
    password: string;
  }>({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      userId: '',
      password: '',
    },
    validationSchema: Yup.object({
      userId: Yup.string().trim().required('Enter your email or your username'),
      password: Yup.string().trim().required('Enter your password'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className={styles.signin_form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="userId"
        error={errors.userId}
        value={values.userId}
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="password"
        name="password"
        error={errors.password}
        value={values.password}
        placeholder="Password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className={styles.input_keep_logged}>
        <label htmlFor="KeepLoged">
          <input type="checkbox" />
          <small className={styles.keep_logged}>Keep me logged in</small>
        </label>
      </div>
      <Button type="submit" variant="primary">
        Log in
      </Button>
    </form>
  );
}
