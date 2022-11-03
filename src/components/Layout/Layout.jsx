import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  selectUserBalance,
  selectUserName,
} from 'redux/authorization/selectorsAuth';
import { logOutThunk } from 'redux/authorization/thunksAuth';
import { ReactComponent as LogoWallet } from '../../static/images/logo.svg';
import { ReactComponent as IconExit } from '../../static/images/iconExit.svg';

import css from './Layout.module.css';
import Currency from 'components/Currency/Currency';
import { showModal } from 'redux/modal/modalSlice';
import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useNavigate();
  const currentUserName = useSelector(selectUserName);
  const userCurrentBalance = useSelector(selectUserBalance);

  const handleLogout = () => {
    dispatch(logOutThunk());
    location('/');
  };

  const handleOpenModal = () => {
    dispatch(showModal(true));
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      dispatch(showModal(false));
    }
  };

  return (
    <div className={css.layoutContainer}>
      <div className={css.layoutHeader}>
        <Link to="/home" end="true" className={css.wallet}>
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
            Your balance{' '}
            <span className={css.balanceAmount}>
              ${userCurrentBalance?.toLocaleString()}
            </span>
          </div>

          <Currency />
        </div>

        <div className={css.outlets}>
          <Outlet />
        </div>
      </div>

      {window.location.pathname === '/react-team-project/home' && (
        <>
          <AddTransactionModal />

          <button
            type="button"
            onClick={handleOpenModal}
            onKeyDown={handleEscapeKey}
            className={css.openModalBtn}
          ></button>
        </>
      )}
    </div>
  );
};

export default Layout;
