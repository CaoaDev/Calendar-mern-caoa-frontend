import React from 'react';
import { Navigate } from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import PropTypes from 'prop-types';

export const PublicRoute = ( { children, isValid } = {} ) => {
    return isValid
        ?( <Navigate to='/' element={ <CalendarScreen /> } /> )

        : children
}

PublicRoute.propTypes = {
    isValid: PropTypes.bool.isRequired,
}