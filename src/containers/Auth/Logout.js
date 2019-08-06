import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authenticationActions} from '../../store/_actions/authentication';

const LogoutContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authenticationActions.logout())

    }, [dispatch]);
    return <Redirect to="/login"/>;
};

export default LogoutContainer;