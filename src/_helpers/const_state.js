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
    sort: true,
    filter: textFilter()
}, {
    dataField: 'lastname',
    text: 'Last Name',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'username',
    text: 'User Name',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'email',
    text: 'Email',
    filter: textFilter()
}];


export const leavestate = [
    {
        dataField: 'fromdate',
        text: 'From Date',
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
        filter: textFilter(),
        editor: {
            type: Type.TEXTAREA
        }
    }];