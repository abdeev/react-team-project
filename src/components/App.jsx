import { lazy, Suspense } from 'react';
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn, selectUserToken } from "redux/authorization/selectorsAuth";
import { getCurrentUserInfoThunk } from "redux/authorization/thunksAuth";

const AppBar = lazy(() => import('./AppBar'));
const Home = lazy(() => import('../pages/Home'));
const Contacts = lazy(() => import('../pages/Contacts'));
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
        <Routes>
            <Route path="/" element={<Suspense fallback={<p className="text-2xl text-red-400 font-sm mb-4">Loading data...</p>}><AppBar /></Suspense>}>
                <Route index element={<Home />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Registration />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}