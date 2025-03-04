import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from 'views/registerPage/RegisterPage';
import PrivateRoute from 'components/privateRoute/PrivateRoute';
import PublicRoute from 'components/publicRoute/PublicRoute';
import HomePage from 'views/homePage/HomePage';
import LoginPage from 'views/loginPage/LoginPage';
import Layout from 'layouts/Layout';
import StatisticPage from 'views/statisticPage/StatisticPage';
import { useSelector, useDispatch } from 'react-redux';
import { useIsActivTokenQuery } from 'redux/authAPI';
import { useEffect } from 'react';
import { isUserName } from 'redux/sliceUserName';

function App() {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const { data: auth } = useIsActivTokenQuery('', { skip: !token });

    useEffect(() => {
        if (auth === undefined) {
            return;
        }
        dispatch(isUserName(auth.name)); //при монтировании компонентов проверяем подлинность токена.
    }, [auth, dispatch]);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL + '/'}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/statistic"
                        element={
                            <PrivateRoute>
                                <StatisticPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
