import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { useAxios } from '../../../../hooks/useAxios';

import styles from './LoginForm.module.css';

export default function LoginForm({
  onSuccess,
}: {
  onSuccess: () => void;
}): JSX.Element {
  const [error, setError] = useState<null | string>(null);
  const axios = useAxios();
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    values,
    isSubmitting,
  } = useFormik<{
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
    onSubmit: async (values) => {
      const response = await axios.get('/api/v1/account/login', {
        auth: {
          username: values.userId,
          password: values.password,
        },
        headers: {
          'content-type': 'application/json',
        },
        responseType: 'json',
        validateStatus: null,
      });

      if (response.status === 200) {
        onSuccess();
        return;
      }

      setError(JSON.parse(response.data).message);
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
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Button type="submit" variant="primary" isLoading={isSubmitting}>
        Log in
      </Button>
    </form>
  );
}
