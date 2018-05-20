import { LOG_IN } from '../actions/login-action';
import { LOG_OUT } from '../actions/logout-action';

export default function loginReducer(state = {}, action) {
    switch (action.type) {
        case LOG_IN:
            state.isLoggedIn = action.payload.isLoggedIn;
            return state;
        case LOG_OUT:
            action.payload.isLoggedIn ? state = action.payload : state = {};
            return state;
        default: return state;
    }
}