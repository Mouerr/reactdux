import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalC from '../components/UI/Modal';
import PropTypes from 'prop-types';
import {checkFormValidity} from "../_helpers/form-validator";
import {datatable} from "../store/_actions/datatable";
import DataTable from "../components/DataTable/DataTable";
import DataTableButtons from "../components/DataTable/DataTableButtons";

class DataTableContainer extends Component {
    state = {
        dt_object: this.props.formconfig,
        formIsValid: false,
        page: 1,
        sizePerPage: 10,
        totalSize: 100,
        deleteRowId: ''
    };

    componentDidMount() {
        this.props.dispatch(datatable.getAll(this.props.api));
    }

    handleDelete = () => {
        if (this.state.deleteRowId !== ''){
            this.props.dispatch(datatable.delete(this.props.api, this.state.deleteRowId));
            this.setState({deleteRowId: ''})
        }
    };

    handleToggle = () => {
        this.props.dispatch(datatable.toggleModal());
    };

    handleUpdate = editedRow => {
        this.props.dispatch(datatable.update(this.props.api, editedRow));
    };

    handleFilter = conditions => {
        this.props.dispatch(datatable.filter(this.props.api, conditions));
    };

    handleFormChange = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.dt_object
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        if (event.target.type === 'checkbox') {
            const checkboxname = event.target.value;
            updatedFormElement.value[checkboxname] = !updatedFormElement.value[checkboxname];
        } else {
            updatedFormElement.value = event.target.value;
        }
        const checkValidity = checkFormValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValidity.isValid;
        updatedFormElement.errorMessage = checkValidity.errorMessage;
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({dt_object: updatedForm, formIsValid: formIsValid});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.dt_object) {
            formData[formElementIdentifier] = this.state.dt_object[formElementIdentifier].value;
        }
        this.props.dispatch(datatable.create(this.props.api, formData))
    };

    handleTableChange = (type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit}) => {
        const conditions = {page, sizePerPage, filters, sortField, sortOrder};

        console.log('change', type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit});
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

    render() {
        const {page, sizePerPage, totalSize} = this.state;
        return (
            <div className="container" style={{marginTop: 50}}>
                <>
                    <DataTableButtons
                        onToggle={this.handleToggle}
                        onDelete={this.handleDelete}
                        disableDelete={this.state.deleteRowId}
                    />
                    <ModalC
                        formElementsArray={this.state.dt_object}
                        modal={this.props.modal}
                        formIsValid={this.state.formIsValid}
                        submitting={this.props.submitting}
                        onToggle={this.handleToggle}
                        onSubmit={this.handleFormSubmit}
                        onChange={this.handleFormChange}
                    />
                    <DataTable
                        columns={this.props.dtconfig}
                        data={this.props.items}
                        onTableChange={this.handleTableChange}
                        onSelect={this.handleOnSelect}
                        page={page}
                        loading={this.props.loading}
                        sizePerPage={sizePerPage}
                        totalSize={totalSize}
                    />
                </>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {items, submitting, loading, modal} = state.datatable;
    return {
        items, submitting, loading, modal
    };
};

const connectedDataTableContainer = connect(mapStateToProps)(DataTableContainer);
export {connectedDataTableContainer as DataTableContainer};

DataTableContainer.propTypes = {
    dtconfig: PropTypes.array.isRequired,
    formconfig: PropTypes.object.isRequired,
};