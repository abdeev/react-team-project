import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import css from './LoginForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { ReactComponent as Logo } from 'icons/logo.svg';
import { logInThunk } from 'redux/authorization/thunksAuth';
import { selectIsLoggedIn } from 'redux/authorization/selectorsAuth';
import { useEffect, useState } from 'react';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (email && password) {
      dispatch(logInThunk({ email, password }));
      navigate('/home');
    }
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [email, password, dispatch, isLoggedIn, navigate]);

  const handleLogin = e => {
    const { email, password } = e;
    setEmail(email);
    setPassword(password);

    if (!isLoggedIn) {
      return;
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid e-mail')
      .required('Required field to fill!'),
    password: Yup.string().required('Required field to fill!'),
  });
  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={handleLogin}
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
                  value={values.password}
                  className={css.input}
                />
              </div>
              <button
                className={css.button}
                type="submit"
                disabled={!isValid && !dirty}
              >
                Log in
              </button>
              <div className={css.linkWrapper}>
                <NavLink className={css.link} to="/register">
                  Register
                </NavLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
