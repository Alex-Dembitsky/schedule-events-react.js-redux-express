import axios from 'axios/index';
export const LOG_IN = 'login';

export function logIn(email, password) {
    return dispatch => {
        axios.post(`/login?email=${email}&password=${password}`)
            .then(response => {
                let token = response.headers['x-token'];
                window.localStorage.setItem('Token', token);
                window.localStorage.setItem('isLoggedIn', true);
                window.location.href = '/events';

                dispatch({type: LOG_IN, payload: {isLoggedIn: true}});
            })
            .catch(error => {
                alert(error);
            });
    }
}