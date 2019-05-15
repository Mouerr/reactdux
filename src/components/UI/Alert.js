import React from 'react';
import {Alert} from 'reactstrap';

const AlertC = props => {
    const {alert} = props;

    return (
        alert.message &&
        <Alert color={alert.type}>
            {alert.message}
        </Alert>
    )
};

export default React.memo(AlertC);