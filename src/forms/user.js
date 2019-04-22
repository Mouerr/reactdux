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
        errorMessage:[],
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
        errorMessage:[],
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
        errorMessage:[],
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
        errorMessage:[],
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
        errorMessage:[],
        touched: false
    }/*,
    enabled: {
        elementType: 'radio',
        elementConfig: {
            options: [
                {value: 'Yes'},
                {value: 'Noo'},
            ]
        },
        value: '',
        label: 'enabled',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    }*/
};