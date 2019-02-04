import React from 'react';
import {connect} from 'react-redux';
import LeaveList from '../../_components/User/UserList';

import {userActions} from '../../_actions';

class UserPage extends React.Component {
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

const connectedUserPage = connect(mapStateToProps)(UserPage);
export {connectedUserPage as UserPage};