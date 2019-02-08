import React from 'react';
import {connect} from 'react-redux';
import LeaveList from '../../components/User/List';

import {userActions} from '../../_actions';

class UserListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const {users} = this.props;
        return (
            <LeaveList
                users={users}
                onDelete={this.handleDeleteUser}
            />
        );
    }
}

function mapStateToProps(state) {
    const {users} = state;
    return {
        users
    };
}

const connectedUserListContainer = connect(mapStateToProps)(UserListContainer);
export {connectedUserListContainer as UserListContainer};