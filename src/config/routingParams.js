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

export const routingParams =
    {
        'Dashboard': {
            container: TimelineContainer,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: false,
        },
        'User List': {
            container: DataTableContainer,
            formConfig: userForm,
            dtConfig: dtUserConfig,
            apiService: {api: userService, objName: 'user'},
            navbar: true,
            icons: ['user-plus', 'user-minus']
        },
        'User Create': {
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: userForm,
            apiService: {api: userService, objName: 'user', constant: userConstants},
            navbar: true,
            title: 'Create User'
        },
        'User Update': {
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: userForm,
            apiService: {api: userService, objName: 'user', constant: userConstants},
            navbar: false,
            title: 'Update User'
        },
        'Leave List': {
            container: DataTableContainer,
            formConfig: leaveForm,
            dtConfig: dtLeaveConfig,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: true,
            icons: ['calendar-plus', 'calendar-minus']
        },
        'User Leaves': {
            container: DataTableContainer,
            formConfig: leaveForm,
            dtConfig: dtLeaveConfig,
            apiService: {api: leaveService, objName: 'leave'},
            navbar: false,
            icons: ['calendar-plus', 'calendar-minus']
        },
        'Leave Create': {
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: leaveForm,
            apiService: {api: leaveService, objName: 'leave', constant: leaveConstants},
            navbar: true,
            title: 'Create Leave'
        },
        'Leave Update': {
            container: FormBuilderContainer,
            action: globalActions,
            formConfig: leaveForm,
            apiService: {api: leaveService, objName: 'leave', constant: leaveConstants},
            navbar: false,
            title: 'Update Leave'
        }
    };