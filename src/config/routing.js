import {TimelineContainer} from "../containers/Timeline";
import {DataTableContainer} from "../containers/DataTable";
import {userForm} from "../forms/user";
import {dtLeaveConfig, dtUserConfig} from "./dataTableConfig";
import {FormBuilderContainer} from "../containers/FormBuilder";
import {leaveForm} from "../forms/leave";
import {globalActions} from "../store/_actions";
import {leaveConstants, userConstants} from "../store/_constants";
import {Leave} from "../api/leave";
import {User} from "../api/user";
const leaveService = new Leave('leaves');
const userService = new User('users');
export const routing =
    [
        {
            reactPath: '/',
            container: TimelineContainer,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: false,
            roleName: 'Dashboard'
        },
        {
            reactPath: '/user/list',
            container: DataTableContainer,
            formConfig: userForm,
            dtConfig: dtUserConfig,
            apiService: {api: userService, objName: 'user'},
            navbar: true,
            roleName: 'User List',
            icons: ['user-plus', 'user-minus']
        },
        {
            reactPath: '/user/create',
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: userForm,
            apiService: {api: userService, objName: 'user', constant: userConstants},
            navbar: true, label: 'User Create',
            roleName: 'User Create',
            title:'Create User'
        },
        {
            reactPath: '/user/update/:objId',
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: userForm,
            apiService: {api: userService, objName: 'user', constant: userConstants},
            navbar: false,
            roleName: 'User Update',
            title:'Update User'
        },
        {
            reactPath: '/leave/list',
            container: DataTableContainer,
            formConfig: leaveForm,
            dtConfig: dtLeaveConfig,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: true,
            roleName: 'Leave List',
            icons: ['calendar-plus', 'calendar-minus']
        },
        {
            reactPath: '/user/:objId/leaves',
            container: DataTableContainer,
            formConfig: leaveForm,
            dtConfig: dtLeaveConfig,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: false,
            roleName: 'User Leaves',
            icons: ['calendar-plus', 'calendar-minus']
        },
        {
            reactPath: '/leave/create',
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: leaveForm,
            apiService: {api: leaveService, objName: 'leave', constant: leaveConstants},
            navbar: true,
            roleName: 'Leave Create',
            title:'Create Leave'
        },
        {
            reactPath: '/leave/update/:objId',
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: leaveForm,
            apiService: {api: leaveService, objName: 'leave', constant: leaveConstants},
            navbar: false,
            roleName: 'Leave Update',
            title:'Update Leave'
        },
    ];