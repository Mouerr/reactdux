import React from 'react';
import {Button} from 'reactstrap';
const DataTableButtons = props => {
    const {onToggle, onDelete, disableDelete} = props;

    return <>
        <Button onClick={onToggle} color="primary" outline>Add New Row</Button>
        <Button color="danger" onClick={onDelete} disabled={!disableDelete}>Delete Selected Row</Button>
        </>
};

export default React.memo(DataTableButtons);