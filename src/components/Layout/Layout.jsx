import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { selectUserName } from 'redux/authorization/selectorsAuth';
import { logOutThunk } from 'redux/authorization/thunksAuth';
import { ReactComponent as LogoWallet } from '../../static/images/logo.svg';
import { ReactComponent as IconExit } from '../../static/images/iconExit.svg';

import css from './Layout.module.css';
import Currency from 'components/Currency/Currency';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useNavigate();
  const currentUserName = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logOutThunk());
    location('/');
  };

  return (
    <div className={css.layoutContainer}>
      <NavLink to="/" end>
        <LogoWallet className={css.logoWallet} />
      </NavLink>

      <Link className={css.linkExit} onClick={handleLogout}>
        <p className={css.welcomeName}>{currentUserName}</p>
        <IconExit className={css.iconExit} />
        <p className={css.textExit}>Exit</p>
      </Link>
      <Currency />

      <Outlet />
    </div>
  );
};

export default Layout;
