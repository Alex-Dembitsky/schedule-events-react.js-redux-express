export const LOG_OUT = 'logOut';

export function logOut() {
    window.localStorage.removeItem('Token');
    window.localStorage.removeItem('isLoggedIn');

    return {
        type: LOG_OUT,
        payload: {
            isLoggedIn: false
        }
    }
}