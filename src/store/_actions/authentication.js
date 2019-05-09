import {authenticationConstants} from '../_constants';
import {userService} from '../../api';
import {alert} from './index';
import {history} from '../../_helpers';

const loginRequest = (user) => {
    return {type: authenticationConstants.LOGIN_REQUEST, user}
};

const loginSuccess = (user) => {
    return {type: authenticationConstants.LOGIN_SUCCESS, user}
};

const loginFailure = (error) => {
    return {type: authenticationConstants.LOGIN_FAILURE, error}
};

const login = (email, password) => {

    return dispatch => {
        dispatch(loginRequest({email}));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(loginSuccess(user));
                    dispatch(checkAuthTimeout(user.expirationTime));
                    history.push('/');
                },
                error => {
                    dispatch(loginFailure(error.toString()));
                    dispatch(alert.error(error.toString()));
                }
            );
    };
};

const logout = () => {
    userService.logout();
    return {type: authenticationConstants.LOGOUT};
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
            dispatch(alert.warning('Session Expired'));
        }, expirationTime * 1000);
    };
};

const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const user = localStorage.getItem('user');
                dispatch(loginSuccess(user));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const authentication = {
    login,
    logout,
    authCheckState
};