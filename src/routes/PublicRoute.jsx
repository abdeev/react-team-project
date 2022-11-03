import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserToken } from 'redux/authorization/selectorsAuth';

const PublicRoute = () => {
  const token = useSelector(selectUserToken);
  return token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
