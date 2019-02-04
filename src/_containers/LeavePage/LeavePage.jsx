import React from 'react';
import {connect} from 'react-redux';
import LeaveList from '../../_components/Leave/LeaveList';

import {leaveActions, userActions} from '../../_actions';

class LeavePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteLeave = this.handleDeleteLeave.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(leaveActions.getAll());
    }

    handleDeleteLeave(id) {
        return (e) => this.props.dispatch(leaveActions.delete(id));
    }

    render() {
        const {leaves} = this.props;
        return (
            <LeaveList
                leaves={leaves}
                onDelete={this.handleDeleteLeave}
            />
        );
    }
}

function mapStateToProps(state) {
    const {leaves} = state;
    return {
        leaves
    };
}

const connectedLeavePage = connect(mapStateToProps)(LeavePage);
export {connectedLeavePage as LeavePage};