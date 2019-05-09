import React, {Component} from 'react';
import {connect} from 'react-redux';
import LeaveForm from '../../components/Leave/Form';

import {leave} from '../../store/_actions';

class LeaveFormContainer extends Component {
    state = {
        leave: {
            fromdate: '',
            todate: '',
            leavetype: '',
            cause: '',
            userId: JSON.parse(localStorage.getItem('user')).id
        },
        submitted: false
    };

    componentDidMount() {
        if (this.props.match.url !== '/leave/create') {
            const leaveid = this.props.match.params.leaveid;
            this.props.dispatch(leave.getById(leaveid));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== '/leave/create') {
            if (this.props.leaves.item !== prevProps.leaves.item) {
                if (typeof this.props.leaves.item !== "undefined") {
                    const {leaves} = this.props;
                    this.setState({
                        leave: {
                            id: leaves.item.id,
                            fromdate: leaves.item.fromdate,
                            todate: leaves.item.todate,
                            leavetype: leaves.item.leavetype,
                            cause: leaves.item.cause,
                            userId: leaves.item.userId
                        }
                    });
                }
            }
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        const {leave} = this.state;
        this.setState({
            leave: {
                ...leave,
                [name]: value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({submitted: true});
        const {leave} = this.state;
        const {dispatch} = this.props;
        if (leave.fromdate && leave.leavetype && leave.todate && leave.cause) {
            if (this.props.match.url === '/leave/create') {
                dispatch(leave.create(leave));
            } else {
                dispatch(leave.update(leave));
            }
        }
    };

    render() {
        const {submitting} = this.props;
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
    const {submitting} = state.leaves;
    const {leaves} = state;
    return {
        submitting,
        leaves
    };
}

const connectedLeaveFormContainer = connect(mapStateToProps)(LeaveFormContainer);
export {connectedLeaveFormContainer as LeaveFormContainer};