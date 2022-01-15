import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { useAxios } from '../../../../hooks/useAxios';

import styles from './SignUpForm.module.css';

export default function SignUpForm({
  onSucces,
}: {
  onSucces(): void;
}): JSX.Element {
  const axios = useAxios();
  const { handleChange, handleSubmit, handleBlur, values, errors } = useFormik<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().trim().required('Enter your name.'),
      lastName: Yup.string().trim(),
      username: Yup.string()
        .trim()
        .required('Enter your username')
        .matches(/^[a-z0-9_-]{3,15}$/, 'Username is not valid'),
      email: Yup.string()
        .trim()
        .required('Enter your email')
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          'Email is not valid.',
        ),
      password: Yup.string()
        .trim()
        .required('Enter your password')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Password is not strong enough.',
        ),
      confirmPassword: Yup.string()
        .trim()
        .required('Confirm your password')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Password is not strong enough.',
        )
        .oneOf([Yup.ref('password'), null], "Passwords don't match."),
    }),
    onSubmit: async (values) => {
      const response = await axios.post(
        '/api/v1/account/register',
        JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          birthdate: new Date().toJSON(),
        }),
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        onSucces();
        return;
      }

      console.error(response);
    },
  });

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <Input
        type="text"
        name="firstName"
        error={errors.firstName}
        placeholder="First name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
      />
      <Input
        type="text"
        name="lastName"
        error={errors.lastName}
        placeholder="Last name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
      />
      <Input
        type="text"
        name="username"
        error={errors.username}
        placeholder="Username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      <Input
        type="email"
        name="email"
        error={errors.email}
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      <Input
        type="password"
        name="password"
        error={errors.password}
        placeholder="Password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      <Input
        type="password"
        name="confirmPassword"
        error={errors.confirmPassword}
        placeholder="Confirm Password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
      />
      <Button type="submit" variant="primary">
        Sign up
      </Button>
    </form>
  );
}
