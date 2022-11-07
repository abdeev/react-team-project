import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { selectIsLoggedIn } from '../../redux/authorization/selectorsAuth';

import { ReactComponent as Homesvg } from '../../icons/home.svg';
import { ReactComponent as Statissvg } from '../../icons/statis.svg';
import { ReactComponent as Dollarsvg } from '../../icons/dollar-icon.svg';

import style from '../Navigation/Navigation.module.css';

export default function Navigation() {
  const isLogin = useSelector(selectIsLoggedIn);
  const { pathname } = useLocation();

  return (
    <nav className={style.container}>
      <div className={style.nav__link}>
        {isLogin && (
          <>
            <NavLink to="/home" className={style.home}>
              <Homesvg
                fill=" current"
                className={`${style.home__svg} ${
                  pathname === '/home' ? style.activ__svg : ''
                } `}
              />
              <span
                className={`${style.home__word} ${
                  pathname === '/home' ? style.activ : ''
                }`}
              >
                Home
              </span>
            </NavLink>

            <NavLink to="/statistics" className={style.statis}>
              <Statissvg
                className={`${style.statis__svg} ${
                  pathname === '/statistics' ? style.activ__svg  : ''
                }`}
              />
              <span
                className={`${style.statis__word} ${
                  pathname === '/statistics' ? style.activ : ''
                }`}
              >
                Statistics
              </span>
            </NavLink>

            <NavLink to="/currencies" className={style.curren }>
              <Dollarsvg
                className={`${style.curren__svg} ${
                  pathname === "/currencies" ? style.activ__svg  : ''
                }`}
              />
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
