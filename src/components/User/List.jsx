import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function UserList(props) {

    const {users, onDelete} = props;

    return (
        <div className="col-md-12">
            <h3>All Users:</h3>
            <p><Link to="/leave/create">Create Leave</Link></p>
            <p><Link to="/user/create">Create User</Link></p>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>FULL NAME</th>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>LEAVES</th>
                    <th className='text-center'>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {users.items.map((user, index) =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstname + ' ' + user.lastname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><Link className="btn btn-info btn-md" to={"/user/" + user.id + "/leaves"}>Leaves</Link></td>
                        <td>{
                            user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <div className="col-sm-12 text-center">
                                    <button className="btn btn-danger btn-md"
                                            onClick={onDelete(user.id)}>Delete
                                    </button>
                                    <Link className="btn btn-primary btn-md" to={"/user/update/" + user.id}>Update</Link>
                                </div>
                        }</td>
                    </tr>
                )}
                </tbody>
            </table>
            }
        </div>
    )
}
UserList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};