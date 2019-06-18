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
        dt_object: this.props.formconfig,
        formIsValid: false,
        page: 1,
        sizePerPage: 10,
        totalSize: 100,
        deleteRowId: ''
    };
    baseObjState = this.state.dt_object;

    resetForm = () => {
        this.setState({
            dt_object: this.baseObjState,
            formIsValid: false
        })
    };

    componentDidMount() {
        this.props.dispatch(datatableActions.getAll(this.props.apiservice));
    }

    handleDelete = () => {
        if (this.state.deleteRowId !== '') {
            this.props.dispatch(datatableActions.delete(this.props.apiservice, this.state.deleteRowId));
            this.setState({deleteRowId: ''})
        }
    };

    handleToggle = () => {
        this.props.dispatch(datatableActions.toggleModal());
    };

    handleUpdate = editedRow => {
        this.props.dispatch(datatableActions.update(this.props.apiservice, editedRow));
    };

    handleFilter = conditions => {
        this.props.dispatch(datatableActions.filter(this.props.apiservice, conditions));
    };

    handleFormChange = (event, inputIdentifier) => {
        const formPopulation = populateFormObject(event, this.state.dt_object, inputIdentifier);
        this.setState({dt_object: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.formIsValid) {
            const formData = {};
            for (let formElementIdentifier in this.state.dt_object) {
                formData[formElementIdentifier] = this.state.dt_object[formElementIdentifier].value;
            }
            this.props.dispatch(datatableActions.create(this.props.apiservice, formData));
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
        const formPopulation = populateFormObject(value, this.state.dt_object, inputIdentifier, 'Inject');
        this.setState({dt_object: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.dt_object !== this.state.dt_object ||
            nextProps.items !== this.props.items ||
            nextState.deleteRowId !== this.state.deleteRowId ||
            nextProps.modal !== this.props.modal
            ;
    }

    render() {
        const {page, sizePerPage, totalSize} = this.state;
        return (
            <div className="container" style={{marginTop: 50}}>
                <>
                    <DataTableButtons
                        data={this.props.items}
                        icons={this.props.icons}
                        objname={this.props.apiservice.objname}
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
                        onInjectValue={this.injectValue}
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
    dtconfig: PropTypes.array.isRequired,
    formconfig: PropTypes.object.isRequired,
};