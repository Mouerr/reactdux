import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (type, message) => toast[type](message);
const AlertC = props => {
    const {alert} = props;

    return (
        alert.message && notify(alert.type, alert.message) && <ToastContainer/>
    )
};

export default React.memo(AlertC);