import React from 'react';
import { Navigate } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import PropTypes from 'prop-types';


export const PrivateRoute = ( { children, isValid } = {} ) => {

    return isValid
        ? children
        : ( <Navigate to='/login' element={ < LoginScreen /> } /> )
}

PrivateRoute.propTypes = {
    isValid: PropTypes.bool.isRequired,
}