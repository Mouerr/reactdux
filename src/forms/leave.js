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
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'Special leave', displayValue: 'Special leave'},
                {value: 'Paid leave', displayValue: 'Paid leave'},
                {value: 'Sick leave', displayValue: 'Sick leave'},
                {value: 'National Holidays', displayValue: 'National Holidays'},
                {value: 'Religious Holidays', displayValue: 'Religious Holidays'}
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