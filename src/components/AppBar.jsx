import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

import { Container } from 'components/Container';
import {
  selectUserName,
  selectIsLoggedIn,
} from 'redux/authorization/selectorsAuth';
import { logOutThunk } from 'redux/authorization/thunksAuth';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const location = useNavigate();

  const handleLogout = () => {
    dispatch(logOutThunk());
    location('/');
  };

  return (
    <>
      <header className="p-50 bg-orange-400 py-3 border-b-2 border-solid border-black">
        <Container>
          <div className="flex justify-between items-baseline">
            <nav className="flex items-center">
              <ul className="flex items-center gap-3">
                {isLoggedIn && (
                  <li className="px-5 py-2">
                    <NavLink
                      className="text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300"
                      to="/"
                      end
                    >
                      Home
                    </NavLink>
                  </li>
                )}

                {/* <li className="px-5 py-2">
                                    <NavLink className="text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300" to='/' end>Home</NavLink>
                                </li>

                                {isLoggedIn &&
                                    <li className="px-5 py-2">
                                        <NavLink className="text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300" to='/contacts' end>Contacts</NavLink>
                                    </li>
                                } */}

                {!isLoggedIn && (
                  <>
                    <li className="px-5 py-2">
                      <NavLink
                        className="text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="px-5 py-2">
                      <NavLink
                        className="text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300"
                        to="/register"
                      >
                        Registration
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <div className="flex gap-3 items-center">
              <span className="text-2xl font-medium text-red-600 mr-5">
                {userName}
              </span>

              <button
                className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </header>

      <div className="grow shrink-none basis-auto">
        <Container>
          <div className="flex flex-col">
            <Outlet />
          </div>
        </Container>
      </div>
    </>
  );
};

export default AppBar;
