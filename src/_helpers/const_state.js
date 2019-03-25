//import React from 'react';
import {textFilter, dateFilter, selectFilter, Comparator} from 'react-bootstrap-table2-filter';
import {Type} from 'react-bootstrap-table2-editor';

const selectOptions = {
    'Special leave': 'Special leave',
    'Paid leave': 'Paid leave',
    'Sick leave': 'Sick leave',
    'National Holidays': 'National Holidays',
    'Religious Holidays': 'Religious Holidays',
};

export const userstate = [{
    dataField: 'firstname',
    text: 'First Name',
    type: 'text',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'lastname',
    text: 'Last Name',
    type: 'text',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'username',
    text: 'User Name',
    type: 'text',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'email',
    text: 'Email',
    type: 'email',
    filter: textFilter()
}];


export const leavestate = [
    {
        dataField: 'fromdate',
        text: 'From Date',
        type: 'date',
        sort: true,
        filter: dateFilter({
            defaultValue: {comparator: Comparator.EQ}
        }),
        editor: {
            type: Type.DATE
        }
    },
    {
        dataField: 'todate',
        text: 'To Date',
        type: 'date',
        sort: true,
        filter: dateFilter({
            defaultValue: {comparator: Comparator.EQ}
        }),
        editor: {
            type: Type.DATE
        }
    },
    {
        dataField: 'leavetype',
        text: 'Type',
        type: 'select',
        sort: true,
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            options: selectOptions
        }),
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'Special leave',
                label: 'Special leave'
            }, {
                value: 'Paid leave',
                label: 'Paid leave'
            }, {
                value: 'Sick leave',
                label: 'Sick leave'
            }, {
                value: 'National Holidays',
                label: 'National Holidays'
            }, {
                value: 'Religious Holidays',
                label: 'Religious Holidays'
            }]
        }
    },
    {
        dataField: 'cause',
        text: 'Cause',
        type: 'textarea',
        filter: textFilter(),
        editor: {
            type: Type.TEXTAREA
        }
    }];