import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Link,
  // Navigate,
  Outlet,
  redirect,
  useNavigate,
} from 'react-router-dom';
import {
  selectUserBalance,
  selectUserName,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
// import { logOutThunk } from 'redux/authorization/thunksAuth';
import { ReactComponent as LogoWallet } from '../../static/images/logo.svg';
import { ReactComponent as IconExit } from '../../static/images/iconExit.svg';
import styles from '../Currency/Currency.module.css';
import css from './Layout.module.css';
import Currency from 'components/Currency/Currency';
import { showModal } from 'redux/modal/modalSlice';
import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';

import Navigation from 'components/Navigation/Navigation';

import { LogoutModal } from 'components/LogoutModal/LogoutModal';

import { useEffect } from 'react';


const Layout = () => {
  const dispatch = useDispatch();
  // const location = useNavigate();
  const currentUserName = useSelector(selectUserName);

  const [isShowModal, setIsShowModal] = useState(false);

  const isToken = useSelector(selectUserToken);
  const locationcurrency = useLocation();
  const isHome = locationcurrency.pathname === "/home";

  useEffect(() => {
    if (!isToken) {
      redirect('/login');
    }

    if (isToken) {
      location('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToken]);


  // const handleLogout = () => {
  //   dispatch(logOutThunk());
  //   location('/');
  // };

  const handleOpenModal = () => {
    dispatch(showModal(true));
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      dispatch(showModal(false));
    }
  };
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <div className={css.layoutContainer}>
      <div className={css.layoutHeader}>
        <Link to="/home" end="true" className={css.wallet}>
          <LogoWallet className={css.logoWallet} />
        </Link>

        <div className={css.userWrapper}>
          <p className={css.welcomeName}>{currentUserName}</p>
          <button className={css.exitBtn} type="button" onClick={toggleModal}>
            <IconExit className={css.iconExit} />
            <p className={css.textExit}>Exit</p>
          </button>
        </div>
      </div>
      <div className={css.backdropFilter}>
        <div className={css.container}>
          <div className={css.innerWrapper}>
            <div className={css.navMenuWrapper}>
              <div className={css.navMenuInnerWrapper}>
                <Navigation />
                <div className={` ${css.balance} ${isHome ? " ": styles.hidden}`}>
                  Your balance{' '}
                  <span className={css.balanceAmount}>
                    ${userCurrentBalance?.toLocaleString()}
                  </span>
                </div>
              </div>
              <Currency />
            </div>
            <div className={css.outlets}>
              <Outlet />
            </div>
          </div>
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
          {isShowModal && <LogoutModal onClose={toggleModal} />}
        </>
      )}
    </div>
  );
};

export default Layout;
