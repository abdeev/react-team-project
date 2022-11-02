import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserToken } from 'redux/authorization/selectorsAuth';
import css from './PrivateRoute.module.css';

const PrivateRoute = () => {
  const token = useSelector(selectUserToken);
  return token ? <Outlet className={css.outlet} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
