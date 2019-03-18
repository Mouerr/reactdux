import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {UserListContainer, UserFormContainer} from '../containers/User';
import {LeaveListContainer, LeaveFormContainer} from '../containers/Leave';

const PrivateRoute = ({container: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
);

const registered_routes = [
    {path: '/user/list', container: UserListContainer, navbar: true, label: 'User List'},
    {path: '/user/create', container: UserFormContainer, navbar: true, label: 'User Create'},
    {path: '/user/update/:userid', container: UserFormContainer, navbar: false, label: 'User Update'},
    {path: '/leave/list', container: LeaveListContainer, navbar: true, label: 'Leave List'},
    {path: '/user/:userid/leaves', container: LeaveListContainer, navbar: false, label: 'User Leaves'},
    {path: '/leave/create', container: LeaveFormContainer, navbar: true, label: 'Leave Create'},
    {path: '/leave/update/:leaveid', container: LeaveFormContainer, navbar: false, label: 'Leave Update'},
];

export {PrivateRoute, registered_routes};