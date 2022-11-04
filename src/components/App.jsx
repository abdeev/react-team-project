import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';
import PrivateRoute from 'routes/PrivateRoute';

import Layout from './Layout/Layout';
import { StatisticsPage } from 'pages/StatisticsPage';
import PublicRoute from 'routes/PublicRoute';
// import { StatisticsPage } from 'pages/StatisticsPage';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login'));
const Registration = lazy(() => import('../pages/Registration'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usertoken = useSelector(selectUserToken);

  useEffect(() => {
    if (!isLoggedIn && usertoken) {
      dispatch(getCurrentUserInfoThunk());
    }
  }, [isLoggedIn, usertoken, dispatch]);

  return (
    <Suspense fallback={<p>Loading data...</p>}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
