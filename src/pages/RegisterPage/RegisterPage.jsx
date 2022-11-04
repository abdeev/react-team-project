import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.pageWrapper}>
      <div className={css.pageText}>Finance App</div>
      <div className={css.formWrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
