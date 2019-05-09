import { alertConstants } from '../_constants';

export const alert = {
    success,
    warning,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function warning(message) {
    return { type: alertConstants.WARNING, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}