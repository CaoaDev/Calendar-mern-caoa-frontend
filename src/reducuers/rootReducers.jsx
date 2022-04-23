import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarRedcuer';
import { uiReducer } from './uiReducer';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
});