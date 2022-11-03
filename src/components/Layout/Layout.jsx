import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { selectUserName } from 'redux/authorization/selectorsAuth';
import { logOutThunk } from 'redux/authorization/thunksAuth';
import { ReactComponent as LogoWallet } from '../../static/images/logo.svg';
import { ReactComponent as IconExit } from '../../static/images/iconExit.svg';

import { showModal } from 'redux/modal/modalSlice';

import css from './Layout.module.css';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useNavigate();
  const currentUserName = useSelector(selectUserName);

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
      //???????????????????????? stops listen only if click on some elements, maybe needs to fix!!!!!!!!!!!!!!!!!
    }
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

      <button
        type="button"
        onClick={handleOpenModal}
        onKeyDown={handleEscapeKey}
        className={css.openModalBtn}
      ></button>

      <Outlet />
    </div>
  );
};

export default Layout;
