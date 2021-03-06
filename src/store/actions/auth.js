import actionType from './actionTypes';
import axios from 'axios';

const auth = {
    authStart: () => {
        return {type: actionType.AUTH_START}
    },
    authSuccess: (token, userId) => {
        return {type: actionType.AUTH_SUCCESS, idToken: token, userId: userId, logout: false}

    },
    authFail: (error) => {
        return {type: actionType.AUTH_FAIL, error: error}

    },
    checkAuthTimeout: (expirationTime) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(auth.logout());
            }, expirationTime * 1000);
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationDate');
        localStorage.removeItem('userId');
        return {type: actionType.AUTH_LOGOUT, logout: true}
    },
    setToken: () => {
        return dispatch => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('tokenExpirationDate'));
            if (expirationDate > new Date()) {
                dispatch(auth.authSuccess(token, userId));
                dispatch(auth.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else 
                dispatch(auth.logout());
            }
        },
    auth: (email, password, isSignup) => {
        return dispatch => {
            dispatch(auth.authStart());
            const API_KEY = 'AIzaSyAvR9dLWpN31vc6ItrAoYf7F05Qqr7-KFQ';
            let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
            if (!isSignup) 
                url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }

            axios
                .post(url, authData)
                .then(response => {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('tokenExpirationDate', expirationDate.toString());
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(auth.authSuccess(response.data.idToken, response.data.localId));
                    dispatch(auth.checkAuthTimeout(response.data.expiresIn));
                })
                .catch(error => {
                    dispatch(auth.authFail(error));
                })
        }
    }
}

export default auth;