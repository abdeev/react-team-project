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
      <div className={css.layoutHeader}>
        <Link to="/" end className={css.wallet}>
          <LogoWallet className={css.logoWallet} />
        </Link>

        <Link className={css.linkExit} onClick={handleLogout}>
          <p className={css.welcomeName}>{currentUserName}</p>
          <IconExit className={css.iconExit} />
          <p className={css.textExit}>Exit</p>
        </Link>
      </div>
      <div className={css.innerWrapper}>
        <div className={css.navMenuWrapper}>
          <NavLink to="/home" className={css.navItem}>
            Home
          </NavLink>
          <NavLink to="/statistics" className={css.navItem}>
            Statistics
          </NavLink>

          <div className={css.balance}>
            Your balance <span className={css.balanceAmount}>$24 000.00</span>
          </div>

          <Currency />
        </div>

        <div className={css.outlets}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
