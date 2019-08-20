import React from 'react';
import {Button} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CsvExport from "./CsvExport";
const DataTableButtons = props => {
    const {onToggle, onDelete, isRowIdSelected, objName, icons,data} = props;

    return <>
        <Button onClick={onToggle} color="primary" outline><FontAwesomeIcon icon={icons[0]} size="lg"/> Add new {objName}</Button>
        <Button color="danger" onClick={onDelete} disabled={!isRowIdSelected}><FontAwesomeIcon icon={icons[1]} size="lg"/> Delete selected {objName}</Button>
        {data.length >0 && <CsvExport objName={objName} data={data} FontAwesomeIcon={FontAwesomeIcon}/>}
        </>
};

export default React.memo(DataTableButtons);