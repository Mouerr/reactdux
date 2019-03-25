import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory from 'react-bootstrap-table2-filter';
import ModalC from '../components/Modal';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

export default class DataTableContainer extends Component {
    constructor(props) {
        super(props);

        const dt_object = Object.assign.apply({}, this.props.columns.map((el) => ({[el.dataField]: ''})));
        this.state = {
            dt_object,
            submitted: false
        };
    }

    handleChange = event => {
        const {name, value} = event.target;
        const {dt_object} = this.state;
        this.setState({
            dt_object: {
                ...dt_object,
                [name]: value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {name} = event.target;

        this.setState({submitted: true});
        const {dt_object} = this.state;

        if (this.isEmpty(dt_object) === false) {
            this.props.onSubmit(dt_object);
            this.setState({
                dt_object: {
                    ...dt_object,
                    [name]: ''
                }
            });
        }
    };

    handleTableChange = (type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit}) => {
        let {data} = this.props;
        const {onUpdate, onFilter} = this.props;
        const conditions = {page, sizePerPage, filters, sortField, sortOrder};

        console.log('change', type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit});
        setTimeout(() => {
            // Handle cell editing
            if (type === 'cellEdit') {
                const {rowId, dataField, newValue} = cellEdit;
                let editedRow = '';
                data = data.map((row) => {
                    if (row.id === rowId) {
                        const newRow = {...row};
                        newRow[dataField] = newValue;
                        editedRow = newRow;
                        return newRow;
                    }
                    return row;
                });
                onUpdate(editedRow);
            } else {
                const totalSize = 100;
                onFilter(conditions, page, sizePerPage, totalSize);
            }
        }, 500);
    };

    isEmpty = obj => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === '')
                return true;
        }
        return false;
    };

    render() {
        const {data, columns, loading, page, sizePerPage, totalSize, modal, onToggle, onDelete} = this.props;
        const {dt_object, submitted} = this.state;
        const cols = [...columns, {
            dataField: "id",
            text: "Actions",
            formatter: (cellContent) => {
                return <div>
                    <Button color="danger" onClick={onDelete(cellContent)}>Delete</Button>
                </div>
            }
        }];

        return (
            <div className="container" style={{marginTop: 50}}>
                <React.Fragment>
                    <ModalC
                        title='Add New Row'
                        columns={columns}
                        dt_object={dt_object}
                        submitted={submitted}
                        modal={modal}
                        onToggle={onToggle}
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                    />
                    <BootstrapTable
                        remote
                        bootstrap4
                        hover
                        condensed
                        keyField="id"
                        loading={loading}
                        data={data}
                        columns={cols}
                        filter={filterFactory()}
                        pagination={paginationFactory({page, sizePerPage, totalSize})}
                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                        onTableChange={this.handleTableChange}
                    />
                </React.Fragment>
            </div>
        )
    }
}
DataTableContainer.propTypes = {
    modal: PropTypes.bool,
    loading: PropTypes.bool,
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};