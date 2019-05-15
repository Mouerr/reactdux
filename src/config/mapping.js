import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {TimelineContainer} from "../containers/Timeline";
import {DataTableContainer,} from '../containers/DataTable';
import {LeaveFormContainer} from '../containers/Leave';
import {UserFormContainer} from '../containers/User';

import {dtLeaveConfig, dtUserConfig} from './dataTableConfig';
import {userForm} from '../forms/user';
import {leaveForm} from "../forms/leave";

import {userService, leaveService} from '../api';

const PrivateRoute = ({container: Component, ...rest}) => {
    return <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} formconfig={rest.formconfig} dtconfig={rest.dtconfig} apiservice={rest.apiservice} icons={rest.icons}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
};

const mapping = [
    {
        reactPath: '/',
        container: TimelineContainer,
        /*formconfig: userForm,
        dtconfig: dtUserConfig,*/
        apiservice: {api: leaveService, objname: 'leave'},
        navbar: false,
        roleName: 'Dashboard'
    }, {
        reactPath: '/user/list',
        container: DataTableContainer,
        formconfig: userForm,
        dtconfig: dtUserConfig,
        apiservice: {api: userService, objname: 'user'},
        navbar: true,
        roleName: 'User List',
        icons:['user-plus','user-minus']
    },
    {
        reactPath: '/user/create',
        container: UserFormContainer,
        apiservice: {api: userService, objname: 'user'},
        navbar: true, label: 'User Create',
        roleName: 'User Create'
    },
    {
        reactPath: '/user/update/:userid',
        container: UserFormContainer,
        apiservice: {api: userService, objname: 'user'},
        navbar: false,
        roleName: 'User Update'
    },
    {
        reactPath: '/leave/list',
        container: DataTableContainer,
        formconfig: leaveForm,
        dtconfig: dtLeaveConfig,
        apiservice: {api: leaveService, objname: 'leave'},
        navbar: true,
        roleName: 'Leave List',
        icons: ['calendar-plus','calendar-minus']
    },
    {
        reactPath: '/user/:userid/leaves',
        container: DataTableContainer,
        formconfig: leaveForm,
        dtconfig: dtLeaveConfig,
        apiservice: {api: leaveService, objname: 'leave'},
        navbar: false,
        roleName: 'User Leaves'
    },
    {
        reactPath: '/leave/create',
        container: LeaveFormContainer,
        navbar: true,
        roleName: 'Leave Create'
    },
    {
        reactPath: '/leave/update/:leaveid',
        container: LeaveFormContainer,
        apiservice: {api: leaveService, objname: 'leave'},
        navbar: false,
        roleName: 'Leave Update'
    },
];

export {PrivateRoute, mapping};