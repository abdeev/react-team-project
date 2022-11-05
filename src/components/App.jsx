import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';
import PublicRoute from 'routes/PublicRoute';
import PrivateRoute from 'routes/PrivateRoute';
import Currency from './Currency/Currency';
import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';

// const Home = lazy(() => import('../pages/Home/Home'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const StatisticsPage = lazy(() =>
  import('../pages/StatisticsPage/StatisticsPage')
);
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
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
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path ="diagram" element={<Currency/>}/>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
