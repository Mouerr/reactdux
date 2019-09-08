import React from 'react';
import {useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (type, message) => toast[type](message);
const AlertC = () => {
    const alert = useSelector(store => store.alert);

    return (
        alert.message && notify(alert.type, alert.message) && <ToastContainer/>
    )
};

export default React.memo(AlertC);