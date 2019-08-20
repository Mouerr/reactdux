import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory from 'react-bootstrap-table2-filter';
//import overlayFactory from "react-bootstrap-table2-overlay";
import {Spinner} from 'reactstrap';
//import Radium from 'radium';

const tableSpinner = <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    /*MozTransform: 'translateX(-50%) translateY(-50%)',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',*/
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: '10000'
}}>
    <Spinner style={{width: '5rem', height: '5rem'}}/>
</div>;

const DataTable = props => {
    const {page, sizePerPage, totalSize, data, columns, onSelect, onTableChange} = props;
    const selectRow = {
        mode: 'radio', onSelect: onSelect,
        style: {
            textDecorationLine: 'line-through',
            fontWeight: 800,
            color: '#d9d9d9'
        }
    };
    return <>
        {props.loading && tableSpinner}
        <BootstrapTable
            bootstrap4
            remote
            wrapperClasses="table-responsive"
            hover
            condensed
            keyField="id"
            selectRow={selectRow}
            data={data}
            columns={columns}
            filter={filterFactory()}
            pagination={paginationFactory({page, sizePerPage, totalSize})}
            cellEdit={cellEditFactory({mode: 'dbclick'})}
            onTableChange={onTableChange}
            /*loading={props.loading}
            overlay={overlayFactory({
                spinner: true,
                background: "rgba(192,192,192,0.3)"
            })}*/
            //noDataIndication={() => tableSpinner}
        />
    </>
};
export default React.memo(DataTable);