import {registrationConstants} from '../_constants';

export const registration = (state = {submitting: false}, action) => {
    switch (action.type) {
        case registrationConstants.REGISTER_REQUEST:
            return {submitting: true};
        case registrationConstants.REGISTER_SUCCESS:
            return {};
        case registrationConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}