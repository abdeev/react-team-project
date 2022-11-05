import { NavLink } from 'react-router-dom';
import css from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={css.NotFound_container}>
      <p className={css.NotFound_text}>This page is not created yet 🤔</p>
      <p className={css.NotFound_text}>Try to check your URL 🤓</p>

      <NavLink to="/home">
        <button className={css.NotFound_button}>To main page!</button>
      </NavLink>
    </div>
  );
};

export default PageNotFound;
