import {alertConstants} from '../_constants';

const success = (message) => {
    return {type: alertConstants.SUCCESS, message};
};

const warning = (message) => {
    return {type: alertConstants.WARNING, message};
};

const error = (message) => {
    return {type: alertConstants.ERROR, message};
};

const clear = () => {
    return {type: alertConstants.CLEAR};
};

export const alertActions = {
    success,
    warning,
    error,
    clear
};