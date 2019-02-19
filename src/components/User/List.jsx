import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Table} from 'reactstrap';

export default function UserList(props) {

    const {users, onDelete} = props;

    return (
        <React.Fragment>
            <div className='pb-2 mt-4 mb-2'>
                <h3>Users List:</h3>
            </div>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
            <Table hover striped responsive>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Uuer Name</th>
                    <th>Email</th>
                    <th>Leaves</th>
                    <th className='text-center'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.items.map((user, index) =>
                    <tr key={user.id}>
                        <td>{user.firstname + ' ' + user.lastname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><Link className="btn btn-info btn-md" to={"/user/" + user.id + "/leaves"}>Leaves</Link></td>
                        <td>{
                            user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <div className="col-sm-12 text-center">
                                    <Button color='danger' onClick={onDelete(user.id)}>Delete</Button>{' '}
                                    <Button color='primary' tag={Link} to={"/user/update/" + user.id}>Update</Button>
                                </div>
                        }</td>
                    </tr>
                )}
                </tbody>
            </Table>
            }
        </React.Fragment>
    )
}
UserList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};