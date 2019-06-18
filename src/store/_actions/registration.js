import {registrationConstants} from "../_constants/registration";
import {alertActions} from "./alert";
import {history} from '../../_helpers';

const register = (service, user) => {
    const request = (user) => {
        return {type: registrationConstants.REGISTER_REQUEST, user}
    };
    const success = (user) => {
        return {type: registrationConstants.REGISTER_SUCCESS, user}
    };
    const failure = (error) => {
        return {type: registrationConstants.REGISTER_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(user));

        service.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Account successfully Created, Please check your email to confirm'));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

export const registrationActions = {register};