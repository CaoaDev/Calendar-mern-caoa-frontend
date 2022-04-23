import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { startCheking } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegistrerScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import './AppRouter.css';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { cheking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startCheking() );
    }, [dispatch]);

    if ( cheking) {
        return ( <h5> Cargando Token....</h5> );
    }

  return (
    <BrowserRouter>
        <div className='calendar'>
            <Routes>
                <Route path='/login' element={
                        <PublicRoute isValid={ !!uid }>
                            <LoginScreen />
                        </PublicRoute >
                        }
                    />
                <Route path='/regis' element={
                        <PublicRoute isValid={ !!uid }>
                            <RegisterScreen />
                        </PublicRoute >
                        }
                    />
                <Route path='/' element={
                    <PrivateRoute isValid={ !!uid }>
                        <CalendarScreen />
                    </PrivateRoute >
                    }
                />
                <Route path='*' element={
                    <PrivateRoute isValid={ !!uid }>
                        <CalendarScreen />
                    </PrivateRoute >
                    }
                />
            </Routes>
        </div>
    </BrowserRouter>
    )
}