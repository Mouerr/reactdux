import {rolesRouting} from '../config/rolesRouting';

export const userForm = {
    firstname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your FirstName'
        },
        value: '',
        label: 'First Name',
        validation: {
            required: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    lastname: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your LastName'
        },
        value: '',
        label: 'Last Name',
        validation: {
            required: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your UserName'
        },
        value: '',
        label: 'User Name',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 15,
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
        },
        value: '',
        label: 'Email',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Your Password'
        },
        value: '',
        label: 'Password',
        validation: {
            required: true,
            isPassword: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    groups: {
        elementType: 'reactMultiSelect',
        elementConfig: {
            options: [
                {value: 'ATM', label: 'ATM'},
                {value: 'GTX', label: 'GTX'},
                {value: 'RBX', label: 'RBX'},
                {value: 'SLK', label: 'SLK'},
            ]
        },
        value: '',
        label: 'Groups',
        validation: {
            required: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    roles: {
        elementType: 'checkbox-radio',
        elementConfig: {
            labels: Object.assign.apply({}, Object.keys(rolesRouting).map((el) => ({[el]: 'role denied'}))),
            options: ['role denied', 'role user', 'role manager', 'role admin']
        },
        value: '',
        label: 'Roles',
        validation: {
            required: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    },
    status: {
        elementType: 'radio',
        elementConfig: {
            options: ['Enabled', 'Disabled'],
        },
        value: '',
        label: 'Status',
        validation: {
            required: true
        },
        valid: false,
        errorMessage: [],
        touched: false
    }
};