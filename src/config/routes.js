import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {TimelineContainer} from "../containers/Timeline";
import {DataTableContainer,} from '../containers/DataTable';
import {LeaveFormContainer} from '../containers/Leave';
import {UserFormContainer} from '../containers/User';

import {dtLeaveConfig, dtUserConfig} from '../_helpers/dt_obj_conf';
import {userForm} from '../forms/user';
import {leaveForm} from "../forms/leave";

import {userService, leaveService} from '../api';

const PrivateRoute = ({container: Component, ...rest}) => {
    return <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} formconfig={rest.formconfig} dtconfig={rest.dtconfig} api={rest.apiservice}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
};

const registered_routes = [
    {
        path: '/',
        container: TimelineContainer,
        /*formconfig: userForm,
        dtconfig: dtUserConfig,*/
        apiservice: {api:leaveService,objname:'leave'},
        navbar: false,
        label: 'Dashboard',
        field: 'user_list'
    },{
        path: '/user/list',
        container: DataTableContainer,
        formconfig: userForm,
        dtconfig: dtUserConfig,
        apiservice: {api:userService,objname:'user'},
        navbar: true,
        label: 'User List',
        field: 'user_list'
    },
    {
        path: '/user/create',
        container: UserFormContainer,
        apiservice: {api:userService,objname:'user'},
        navbar: true, label: 'User Create',
        field: 'user_create'
    },
    {
        path: '/user/update/:userid',
        container: UserFormContainer,
        apiservice: {api:userService,objname:'user'},
        navbar: false,
        label: 'User Update',
        field: 'user_update'
    },
    {
        path: '/leave/list',
        container: DataTableContainer,
        formconfig: leaveForm,
        dtconfig: dtLeaveConfig,
        apiservice: {api:leaveService,objname:'leave'},
        navbar: true,
        label: 'Leave List',
        field: 'leave_list'
    },
    {
        path: '/user/:userid/leaves',
        container: DataTableContainer,
        formconfig: leaveForm,
        dtconfig: dtLeaveConfig,
        apiservice: {api:leaveService,objname:'leave'},
        navbar: false,
        label: 'User Leaves',
        field: 'user_leaves'
    },
    {path: '/leave/create', container: LeaveFormContainer, navbar: true, label: 'Leave Create', field: 'leave_create'},
    {
        path: '/leave/update/:leaveid',
        container: LeaveFormContainer,
        apiservice: {api:leaveService,objname:'leave'},
        navbar: false,
        label: 'Leave Update',
        field: 'leave_update'
    },
];

export {PrivateRoute, registered_routes};