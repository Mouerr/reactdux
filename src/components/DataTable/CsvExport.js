import React from 'react';
import {Button} from 'reactstrap';
import {CSVLink} from "react-csv";

const CsvExport = props => {
    const {objName, data, FontAwesomeIcon} = props;

    return <CSVLink data={data} filename={`${objName}${Date.now()}.csv`}>
        <Button color="info"><FontAwesomeIcon icon='file-csv' size="lg"/> Export To CSV</Button>
    </CSVLink>
};

export default React.memo(CsvExport);