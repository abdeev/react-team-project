// import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import LayoutPage from '../pages/LayoutPage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../routes/PrivateRoute';
import StatisticsPage from '../pages/StatisticsPage';

export const App = () => {
  // const dispatch = useDispatch();
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};
