import {datatableConstants} from '../_constants';
import {alertActions} from './index';
import {jsUcFirst} from "../../_helpers/utility";

const create = (service, obj) => {

    const request = (item) => {
        return {type: datatableConstants.CREATE_REQUEST, item}
    };

    const success = (item) => {
        return {type: datatableConstants.CREATE_SUCCESS, item}
    };

    const failure = (error) => {
        return {type: datatableConstants.CREATE_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(obj));

        service.api.create(obj)
            .then(
                item => {
                    dispatch(success(item));
                    dispatch(toggleModal());
                    dispatch(alertActions.success(`${jsUcFirst(service.objname)} successfully created`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(toggleModal());
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

const update = (service, obj) => {

    const request = () => {
        return {type: datatableConstants.UPDATE_REQUEST}
    };

    const success = (item) => {
        return {type: datatableConstants.UPDATE_SUCCESS, item}
    };

    const failure = (error) => {
        return {type: datatableConstants.UPDATE_FAILURE, error}
    };

    return dispatch => {
        dispatch(request());

        service.api.update(obj)
            .then(
                item => {
                    dispatch(success(item));
                    dispatch(alertActions.success(`${jsUcFirst(service.objname)} successfully updated`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

const getAll = (service) => {

    const request = () => {
        return {type: datatableConstants.GET_ALL_REQUEST}
    };

    const success = (items) => {
        return {type: datatableConstants.GET_ALL_SUCCESS, items}
    };

    const failure = (error) => {
        return {type: datatableConstants.GET_ALL_FAILURE, error}
    };

    return dispatch => {
        dispatch(request());

        service.api.getAll()
            .then(
                items => dispatch(success(items)),
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
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

    const request = () => {
        return {type: datatableConstants.FILTER_REQUEST}
    };

    const success = (items) => {
        return {type: datatableConstants.FILTER_SUCCESS, items}
    };

    const failure = (error) => {
        return {type: datatableConstants.FILTER_FAILURE, error}
    };

    return dispatch => {
        dispatch(request());

        const params_filters = pagination_params + filter_params + sort_params;
        service.api.getByDataTableFilter(params_filters)
            .then(
                items => {
                    dispatch(success(items));
                    dispatch(alertActions.success(`${jsUcFirst(service.objname)} table successfully filtered`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                });
    };
};

const toggleModal = () => {
    return {type: datatableConstants.TOGGLE_MODAL}
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (service, id) => {

    const request = (id) => {
        return {type: datatableConstants.DELETE_REQUEST, id}
    };

    const success = (id) => {
        return {type: datatableConstants.DELETE_SUCCESS, id}
    };

    const failure = (error) => {
        return {type: datatableConstants.DELETE_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(id));

        service.api.delete(id)
            .then(
                item => {
                    dispatch(success(id));
                    dispatch(alertActions.success(`${jsUcFirst(service.objname)} successfully deleted`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

export const datatableActions = {
    create,
    update,
    getAll,
    toggleModal,
    filter,
    delete: _delete
};