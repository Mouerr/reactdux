import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">
                <h1>Hi {user.firstname}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                <p><Link to="/create/leave">Create Leave</Link></p>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>FULL NAME</th>
                        <th>USER NAME</th>
                        <th>EMAIL</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.items.map((user, index) =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstname +' '+ user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{
                                user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                            }</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };