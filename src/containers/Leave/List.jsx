import React from 'react';
import {connect} from 'react-redux';
import LeaveList from '../../components/Leave/List';

import {leaveActions} from '../../_actions';

class LeaveListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteLeave = this.handleDeleteLeave.bind(this);
    }

    componentDidMount() {
        if (this.props.match.url === '/leave/list'){
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

const connectedLeaveListContainer = connect(mapStateToProps)(LeaveListContainer);
export {connectedLeaveListContainer as LeaveListContainer};