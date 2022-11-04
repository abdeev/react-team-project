import { LoginForm } from 'components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const Login = () => {
  return (
    <div className={css.pageWrapper}>
      <div className={css.pageText}>Finance App</div>
      <div className={css.formWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
