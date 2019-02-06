import React from 'react';
import {connect} from 'react-redux';
import LeaveList from '../../_components/Leave/LeaveList';

import {leaveActions} from '../../_actions';

class LeavePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteLeave = this.handleDeleteLeave.bind(this);
    }

    componentDidMount() {
        if (this.props.match.url === '/leaves'){
            this.props.dispatch(leaveActions.getAll());
        }else{
            const userid = this.props.match.params.userid;
            this.props.dispatch(leaveActions.getByUserid(userid));
        }
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