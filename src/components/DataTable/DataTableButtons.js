import React from 'react';
import {Button} from 'reactstrap';
const DataTableButtons = props => {
    const {onToggle, onDelete, disableDelete} = props;

    return <React.Fragment>
        <Button onClick={onToggle} color="primary" outline>Add New Row</Button>
        <Button color="danger" onClick={onDelete} disabled={!disableDelete}>Delete Selected Row</Button>
        </React.Fragment>
};

export default React.memo(DataTableButtons);