import {datatableConstants} from '../_constants';
import {alertActions} from './index';

const create = (service, obj) => {
    return dispatch => {
        dispatch(request(obj));

        service.api.create(obj)
            .then(
                item => {
                    dispatch(success(item));
                    dispatch(toggleModal());
                    dispatch(alertActions.success(service.objname + ' successfully Created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(toggleModal());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(item) {
        return {type: datatableConstants.CREATE_REQUEST, item}
    }

    function success(item) {
        return {type: datatableConstants.CREATE_SUCCESS, item}
    }

    function failure(error) {
        return {type: datatableConstants.CREATE_FAILURE, error}
    }
};

const update = (service, obj) => {
    return dispatch => {
        dispatch(request());

        service.api.update(obj)
            .then(
                item => {
                    dispatch(success(item));
                    dispatch(alertActions.success(service.objname + ' successfully Updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {
        return {type: datatableConstants.UPDATE_REQUEST}
    }

    function success(item) {
        return {type: datatableConstants.UPDATE_SUCCESS, item}
    }

    function failure(error) {
        return {type: datatableConstants.UPDATE_FAILURE, error}
    }
};

const getAll = (service) => {
    return dispatch => {
        dispatch(request());

        service.api.getAll()
            .then(
                items => dispatch(success(items)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() {
        return {type: datatableConstants.GET_ALL_REQUEST}
    }

    function success(items) {
        return {type: datatableConstants.GET_ALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: datatableConstants.GET_ALL_FAILURE, error}
    }
};

const filter = (service, conditions) => {
    const pagination_params = '?_page=' + conditions.page + '&_limit=' + conditions.sizePerPage;
    const sort_params = conditions.sortField ? '&_sort=' + conditions.sortField + '&_order=' + conditions.sortOrder : '';
    let filter_params = '';

    Object.entries(conditions.filters).forEach(([key, val]) => {
        if (val.filterType === 'DATE' && val.filterVal.comparator !== '' && val.filterVal.date) {
            filter_params += '&' + key + val.filterVal.comparator + val.filterVal.date.toLocaleDateString('fr-ca')

        } else if (val.filterType === "TEXT" || val.filterType === "SELECT") {
            filter_params += '&' + key + '=' + val.filterVal
        }
    });

    return dispatch => {
        dispatch(request());

        const params_filters = pagination_params + filter_params + sort_params;
        service.api.getByDataTableFilter(params_filters)
            .then(
                items => dispatch(success(items)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request() {
        return {type: datatableConstants.FILTER_REQUEST}
    }

    function success(items) {
        return {type: datatableConstants.FILTER_SUCCESS, items}
    }

    function failure(error) {
        return {type: datatableConstants.FILTER_FAILURE, error}
    }
};

const toggleModal = () => {
    return {type: datatableConstants.TOGGLE_MODAL}
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (service, id) => {
    return dispatch => {
        dispatch(request(id));

        service.api.delete(id)
            .then(
                item => {
                    dispatch(success(id));
                    dispatch(alertActions.success(service.objname + ' successfully Deleted'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) {
        return {type: datatableConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: datatableConstants.DELETE_SUCCESS, id}
    }

    function failure(error) {
        return {type: datatableConstants.DELETE_FAILURE, error}
    }
};

export const datatableActions = {
    create,
    update,
    getAll,
    toggleModal,
    filter,
    delete: _delete
};