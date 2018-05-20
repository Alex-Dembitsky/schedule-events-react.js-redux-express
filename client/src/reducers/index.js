import {combineReducers} from 'redux';
import eventsReducer from './events-reducer';
import loginLogoutReducer from './login-logout-reducer';

const allReducers = combineReducers({
    events: eventsReducer,
    isLoggedIn: loginLogoutReducer
});

export default allReducers;