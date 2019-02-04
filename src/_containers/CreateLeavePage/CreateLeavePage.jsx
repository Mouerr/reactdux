import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LeaveForm from '../../_components/Leave/LeaveForm';

import { leaveActions } from '../../_actions';

class CreateLeavePage extends React.Component {
    constructor(props) {
        super(props);

        const user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            leave: {
                fromdate: '',
                todate: '',
                leavetype: '',
                cause: '',
                userId: user.id
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { leave } = this.state;
        this.setState({
            leave: {
                ...leave,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { leave } = this.state;
        const { dispatch } = this.props;
        if (leave.fromdate && leave.leavetype && leave.todate && leave.cause) {
            dispatch(leaveActions.create(leave));
        }
    }

    render() {
        const { submitting  } = this.props;
        return (
            <LeaveForm
                {...this.state}
                submitting={submitting}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    const { submitting } = state.leaveCreation;
    return {
        submitting
    };
}

const connectedCreateLeavePage = connect(mapStateToProps)(CreateLeavePage);
export { connectedCreateLeavePage as CreateLeavePage };