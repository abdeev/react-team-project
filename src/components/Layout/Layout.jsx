import { useState, useEffect } from 'react';

import { redirect, useLocation } from 'react-router-dom';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
  selectUserBalance,
  selectUserName,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';

import { ReactComponent as LogoWallet } from '../../static/images/logo.svg';
import { ReactComponent as IconExit } from '../../static/images/iconExit.svg';

import Currency from 'components/Currency/Currency';
import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';
import Navigation from 'components/Navigation/Navigation';
import { LogoutModal } from 'components/LogoutModal/LogoutModal';

import Modal from 'components/Modal/Modal';

import styles from '../Currency/Currency.module.css';
import css from './Layout.module.css';

const Layout = () => {
  const location = useNavigate();
  const currentUserName = useSelector(selectUserName);
  const userCurrentBalance = useSelector(selectUserBalance);

  const [showExitModal, setShowExitModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const isToken = useSelector(selectUserToken);
  const locationcurrency = useLocation();
  const isHome = locationcurrency.pathname === '/home';

  useEffect(() => {
    if (!isToken) {
      redirect('/login');
    }

    if (isToken) {
      location();
    }

    if (window.location.pathname === '/react-team-project/') {
      location('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToken]);

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const toggleModal = () => {
    setShowExitModal(!showExitModal);
  };

  return (
    <div className={css.layoutContainer}>
      <div className={css.layoutHeader}>
        <Link to="/home" className={css.wallet}>
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
                <div
                  className={` ${css.balance} ${isHome ? ' ' : styles.hidden}`}
                >
                  Your balance{' '}
                  <span className={css.balanceAmount}>
                    ₴ {userCurrentBalance?.toLocaleString()}.00
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
          <Modal
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
          >
            <AddTransactionModal setIsAddModalOpen={setIsAddModalOpen} />
          </Modal>
          <button
            type="button"
            onClick={handleOpenModal}
            className={css.openModalBtn}
          ></button>
        </>
      )}
      {showExitModal && <LogoutModal onClose={toggleModal} />}
    </div>
  );
};

export default Layout;
