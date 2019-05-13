import React from 'react';
import {textFilter, dateFilter, selectFilter, Comparator} from 'react-bootstrap-table2-filter';
import {Type} from 'react-bootstrap-table2-editor';
import {Badge} from 'reactstrap';

const leaveSelectTypeOptions = {
    'Special leave': 'Special leave',
    'Paid leave': 'Paid leave',
    'Sick leave': 'Sick leave',
    'National Holidays': 'National Holidays',
    'Religious Holidays': 'Religious Holidays',
};
const userEnabledOptions = {
    'Enabled': 'Enabled',
    'Disabled': 'Disabled'
};

export const dtUserConfig = [{
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
}, {
    dataField: 'status',
    text: 'Status',
    filter: selectFilter({
        options: userEnabledOptions
    }),
    editor: {
        type: Type.SELECT,
        options: [{
            value: 'Enabled',
            label: 'Enabled'
        }, {
            value: 'Disabled',
            label: 'Disabled'
        }]
    },
    formatter: (cellContent, row) => {
        if (row.status === 'Enabled') {
            return (
                <h5>
                    <Badge color="success">Enabled</Badge>
                </h5>
            );
        }
        return (
            <h5>
                <Badge color="danger">Disabled</Badge>
            </h5>
        );

    }
}
];


export const dtLeaveConfig = [
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
        formatter: cell => leaveSelectTypeOptions[cell],
        filter: selectFilter({
            options: leaveSelectTypeOptions
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