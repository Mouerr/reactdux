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
    transform: 'translateX(-50%) translateY(-50%)'
}}>
    <Spinner style={{width: '5rem', height: '5rem'}}/>
</div>;

const DataTable = props => {
    const {page, sizePerPage, totalSize, data, columns, onSelect, onTableChange} = props;

    return <React.Fragment>
        {props.loading && tableSpinner}
        <BootstrapTable
            bootstrap4
            remote
            wrapperClasses="table-responsive"
            hover
            condensed
            keyField="id"
            selectRow={{mode: 'radio', onSelect: onSelect}}
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
    </React.Fragment>
};
export default React.memo(DataTable);