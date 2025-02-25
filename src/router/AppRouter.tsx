const baseName = import.meta.env.VITE_BASE_NAME;

import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Loading } from '../components/ui/UserInterface';
import { startCheking } from '../store/slices/login/thunks';

export const AppRouter = () => {

    const dispatch = useAppDispatch();

    const { checking, uid } = useAppSelector((state) => state.login);

    useEffect(() => {
        
        dispatch( startCheking() );

    }, [ dispatch ]);


    if( checking ){
        return ( <Loading/>);
    }

    return (
        <Router basename={baseName}>
            <div>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute
                                isAuthenticated={ !!uid }
                            >
                                <LoginScreen/>
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <PrivateRoute
                                isAuthenticated={ !!uid }
                                >
                                <AuthRouter/>
                            </PrivateRoute>
                        }
                    />
                    
                </Routes>
            </div>
        </Router>
    )
}
