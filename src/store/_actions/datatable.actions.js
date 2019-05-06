import {datatableConstants} from '../_constants';
import {alertActions} from './index';

export const datatableActions = {
    create,
    update,
    getAll,
    toggleModal,
    filter,
    delete: _delete
};

function create(service, obj) {
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
    function toggleModal() {
        return {type: datatableConstants.TOGGLE_MODAL}
    }
}

function update(service, obj) {
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
}

function getAll(service) {
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
        return {type: datatableConstants.GETALL_REQUEST}
    }

    function success(items) {
        return {type: datatableConstants.GETALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: datatableConstants.GETALL_FAILURE, error}
    }
}

function filter(service, conditions) {
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
                results => dispatch(success(results)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request() {
        return {type: datatableConstants.FILTER_REQUEST}
    }

    function success(results) {
        return {type: datatableConstants.FILTER_SUCCESS, results}
    }

    function failure(error) {
        return {type: datatableConstants.FILTER_FAILURE, error}
    }
}

function toggleModal() {
    return dispatch => {
        dispatch(request());
    };

    function request() {
        return {type: datatableConstants.TOGGLE_MODAL}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(service, id) {
    return dispatch => {
        dispatch(request(id));

        service.api.delete(id)
            .then(
                item => {
                    dispatch(success(id));
                    dispatch(alertActions.success(service.objname + ' successfully Deleted'));
                },
                error => {
                    dispatch(failure(id, error.toString()));
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

    function failure(id, error) {
        return {type: datatableConstants.DELETE_FAILURE, id, error}
    }
}