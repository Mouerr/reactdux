import React from 'react';
import {Button} from 'reactstrap';
import { CSVLink } from "react-csv";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DataTableButtons = props => {
    const {onToggle, onDelete, disableDelete, objname, icons,data} = props;

    return <>
        <Button onClick={onToggle} color="primary" outline><FontAwesomeIcon icon={icons[0]} size="lg"/> Add new {objname}</Button>
        <Button color="danger" onClick={onDelete} disabled={!disableDelete}><FontAwesomeIcon icon={icons[1]} size="lg"/> Delete selected {objname}</Button>
        <CSVLink data={data} filename={`${objname}${Date.now()}.csv`}>
            <Button color="info"><FontAwesomeIcon icon='file-csv' size="lg"/> Export To CSV</Button>
        </CSVLink>
        </>
};

export default React.memo(DataTableButtons);