export const leaveForm = {
    fromdate: {
        elementType: 'input',
        elementConfig: {
            type: 'date',
            placeholder: 'From Date'
        },
        value: '',
        label: 'From Date',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    },
    todate: {
        elementType: 'input',
        elementConfig: {
            type: 'date',
            placeholder: 'To Date'
        },
        value: '',
        label: 'To Date',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    },
    leavetype: {
        elementType: 'reactSelect',
        elementConfig: {
            options: [
                {value: 'Special leave', label: 'Special leave'},
                {value: 'Paid leave', label: 'Paid leave'},
                {value: 'Sick leave', label: 'Sick leave'},
                {value: 'National Holidays', label: 'National Holidays'},
                {value: 'Religious Holidays', label: 'Religious Holidays'}
            ]
        },
        value: '',
        label: 'Type',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    },
    cause: {
        elementType: 'textarea',
        elementConfig: {
            type: 'textarea',
            placeholder: 'Cause'
        },
        value: '',
        label: 'Cause',
        validation: {
            required: true
        },
        valid: false,
        errorMessage:[],
        touched: false
    }
};