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
    },
    groups: {
        elementType: 'checkbox',
        elementConfig: {
            options: [
                {value: 'ATM'},
                {value: 'GTX'},
                {value: 'RBX'},
                {value: 'SLK'},
            ]
            //options: ['Enabled','Disabled']
        },
        value: {
            "ATM": false,
            "GTX": false,
            "RBX": false,
            "SLK": false
        },
        label: 'Groups',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    },
    status: {
        elementType: 'radio',
        elementConfig: {
            options: [
                {value: 'Enabled'},
                {value: 'Disabled'},
            ]
        },
        value: '',
        label: 'Status',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    }
};