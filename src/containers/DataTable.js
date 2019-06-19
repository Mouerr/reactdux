import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalC from '../components/UI/Modal';
import PropTypes from 'prop-types';
import {datatableActions} from "../store/_actions/datatable";
import DataTable from "../components/DataTable/DataTable";
import DataTableButtons from "../components/DataTable/DataTableButtons";
import {populateFormObject} from "../_helpers/utility";

class DataTableContainer extends Component {
    state = {
        dtObject: this.props.formConfig,
        formIsValid: false,
        page: 1,
        sizePerPage: 10,
        totalSize: 100,
        deleteRowId: ''
    };
    baseObjState = this.state.dtObject;

    resetForm = () => {
        this.setState({
            dtObject: this.baseObjState,
            formIsValid: false
        })
    };

    componentDidMount() {
        const {dispatch, apiService, roleLevel} = this.props;

        if (roleLevel === 'role admin') {
            dispatch(datatableActions.getAll(apiService));
        } else if (roleLevel === 'role manager') {
            dispatch(datatableActions.getByGroupId(apiService, localStorage.getItem('groupId')));
        } else {
            dispatch(datatableActions.getByUserId(apiService, localStorage.getItem('userId')));
        }
    }

    handleDelete = () => {
        if (this.state.deleteRowId !== '') {
            this.props.dispatch(datatableActions.delete(this.props.apiService, this.state.deleteRowId));
            this.setState({deleteRowId: ''})
        }
    };

    handleToggle = () => {
        this.props.dispatch(datatableActions.toggleModal());
    };

    handleUpdate = editedRow => {
        this.props.dispatch(datatableActions.update(this.props.apiService, editedRow));
    };

    handleFilter = conditions => {
        const {dispatch, apiService, roleLevel} = this.props;
        if (roleLevel === 'role admin') {
            dispatch(datatableActions.filter(apiService, conditions));
        } else if (roleLevel === 'role manager') {
            conditions.filters['groupId']= localStorage.getItem('groupId');
            dispatch(datatableActions.filter(apiService, conditions));
        } else {
            conditions.filters['userId']= localStorage.getItem('userId');
            dispatch(datatableActions.filter(apiService, conditions));
        }
    };

    handleFormChange = (event, inputIdentifier) => {
        const formPopulation = populateFormObject(event, this.state.dtObject, inputIdentifier);
        this.setState({dtObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.formIsValid) {
            const formData = {};
            for (let formElementIdentifier in this.state.dtObject) {
                formData[formElementIdentifier] = this.state.dtObject[formElementIdentifier].value;
            }
            this.props.dispatch(datatableActions.create(this.props.apiService, formData));
            this.resetForm();
        }
    };

    handleTableChange = (type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit}) => {
        const conditions = {page, sizePerPage, filters, sortField, sortOrder};

        //console.log('change', type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit});
        setTimeout(() => {
            // Handle cell editing
            if (type === 'cellEdit') {
                const {rowId, dataField, newValue} = cellEdit;
                let editedRow = '';
                this.props.items.map((row) => {
                    if (row.id === rowId) {
                        const newRow = {...row};
                        newRow[dataField] = newValue;
                        editedRow = newRow;
                        return newRow;
                    }
                    return row;
                });
                this.handleUpdate(editedRow);
            } else {
                const totalSize = 100;
                this.handleFilter(conditions);
                this.setState({
                    page,
                    sizePerPage,
                    totalSize
                });
            }
        }, 500);
    };

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState({deleteRowId: row.id});
            // return true or dont return to approve current select action
            return true;
        }
    };

    injectValue = (value, inputIdentifier) => {
        const formPopulation = populateFormObject(value, this.state.dtObject, inputIdentifier, 'Inject');
        this.setState({dtObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    shouldComponentUpdate(nextProps, nextState) {
        const {items, modal} = this.props;
        const {deleteRowId, dtObject} = this.state;
        return nextState.dtObject !== dtObject ||
            nextProps.items !== items ||
            nextState.deleteRowId !== deleteRowId ||
            nextProps.modal !== modal
            ;
    }

    render() {
        const {page, sizePerPage, totalSize, formIsValid, dtObject, deleteRowId} = this.state;
        const {items, icons, apiService, modal, submitting, dtConfig, loading} = this.props;
        const {handleToggle, handleDelete, handleFormChange, handleFormSubmit, injectValue, handleTableChange, handleOnSelect} = this;
        return (
            <div className="container" style={{marginTop: 50}}>
                <>
                    <DataTableButtons
                        data={items}
                        icons={icons}
                        objName={apiService.objName}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        disableDelete={deleteRowId}
                    />
                    <ModalC
                        formElementsArray={dtObject}
                        modal={modal}
                        formIsValid={formIsValid}
                        submitting={submitting}
                        onToggle={handleToggle}
                        onSubmit={handleFormSubmit}
                        onChange={handleFormChange}
                        onInjectValue={injectValue}
                    />
                    <DataTable
                        columns={dtConfig}
                        data={items}
                        onTableChange={handleTableChange}
                        onSelect={handleOnSelect}
                        page={page}
                        loading={loading}
                        sizePerPage={sizePerPage}
                        totalSize={totalSize}
                    />
                </>
            </div>
        )
    }
}

//DataTableContainer.whyDidYouRender = true;
const mapStateToProps = state => {
    const {items, submitting, loading, modal} = state.datatable;
    return {
        items, submitting, loading, modal
    };
};

const connectedDataTableContainer = connect(mapStateToProps)(DataTableContainer);
export {connectedDataTableContainer as DataTableContainer};

DataTableContainer.propTypes = {
    dtConfig: PropTypes.array.isRequired,
    formConfig: PropTypes.object.isRequired,
};