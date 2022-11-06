import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerThunk } from 'redux/authorization/thunksAuth';
import { MdEmail, MdLock, MdAccountBox } from 'react-icons/md';

import { ReactComponent as Logo } from 'icons/logo.svg';

import css from './RegisterForm.module.css';
import { Notify } from 'notiflix';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleRegister = e => {
    const { name: username, email, password } = e;
    dispatch(registerThunk({ username, email, password }))
      .unwrap()
      .then(
        Notify.success("Congrats! Let's try your new Wallet!", {
          timeout: 5000,
          width: '320px',
          fontFamily: 'Circe',
          position: 'center-top',
          closeButton: false,
        }).then(navigate('/Home'))
      );
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid e-mail')
      .required('Required field to fill!'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(12, 'Password must be 12 characters maximum')
      .required('Required field to fill!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must match!')
      .required('Password confirmation required!'),
    name: Yup.string()
      .min(1, 'First name must be at least 1 characters long')
      .max(12, 'First name must be 12 characters maximum')
      .required('Required field to fill!'),
  });

  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        validateOnBlur
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, values, isValid, dirty, errors }) => {
          return (
            <Form className={css.form}>
              <div className={css.logoWrapper}>
                <Logo className={css.logo} />
                <h1 className={css.title}>Wallet</h1>
              </div>
              <div className={css.inputWrapper}>
                {errors.email && (
                  <div className={css.errorMessage}>*{errors.email}</div>
                )}
                <MdEmail className={css.icon} />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={css.input}
                />
              </div>

              <div className={css.inputWrapper}>
                {errors.password && (
                  <div className={css.errorMessage}>*{errors.password}</div>
                )}
                <MdLock className={css.icon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onInput={e => setPassword(e.target.value)}
                  value={values.password}
                  className={css.input}
                />
              </div>

              <div className={css.inputWrapper}>
                {errors.confirmPassword && (
                  <div className={css.errorMessage}>
                    *{errors.confirmPassword}
                  </div>
                )}
                <MdLock className={css.icon} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={css.input}
                />
                {!errors.confirmPassword && password && (
                  <div className={css.wrapper}>
                    <div className={css.confirmProgress}></div>
                  </div>
                )}
              </div>

              <div className={css.inputWrapper}>
                {errors.name && (
                  <div className={css.errorMessage}>*{errors.name}</div>
                )}
                <MdAccountBox className={css.icon} />
                <input
                  type="text"
                  name="name"
                  placeholder="First name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={css.input}
                />
              </div>

              <button
                className={css.button}
                type="submit"
                disabled={!isValid && !dirty}
              >
                Register
              </button>
              <div className={css.linkWrapper}>
                <NavLink className={css.link} to="/login">
                  Log in
                </NavLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
