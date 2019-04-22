export const leaveForm = {
    fromdate: {
        elementType: 'input',
        elementConfig: {
            type: 'date',
            placeholder: 'From Date'
        },
        value: '',
        label: 'From Date'
    },
    todate: {
        elementType: 'input',
        elementConfig: {
            type: 'date',
            placeholder: 'To Date'
        },
        value: '',
        label: 'To Date'
    },
    type: {
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
        label: 'Type'
    },
    cause: {
        elementType: 'textarea',
        elementConfig: {
            type: 'textarea',
            placeholder: 'Cause'
        },
        value: '',
        label: 'Cause'
    }
};