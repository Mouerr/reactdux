import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function LeaveList(props) {

    const {leaves, onDelete} = props;

    return (
        <div className="col-md-12">
            <h3>Leaves List:</h3>
            <p><Link to="/leave/create">Create Leave</Link></p>
            {leaves.loading && <em>Loading leaves...</em>}
            {leaves.error && <span className="text-danger">ERROR: {leaves.error}</span>}
            {leaves.items &&
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>From DATE</th>
                    <th>TO DATE</th>
                    <th>LEAVE TYPE</th>
                    <th>CAUSE</th>
                </tr>
                </thead>
                <tbody>
                {leaves.items.map((leave, index) =>
                    <tr key={leave.id}>
                        <td>{leave.fromdate}</td>
                        <td>{leave.todate}</td>
                        <td>{leave.leavetype}</td>
                        <td>{leave.cause}</td>
                        <td>{
                            leave.deleting ? <em> - Deleting...</em>
                                : leave.deleteError ? <span className="text-danger"> - ERROR: {leave.deleteError}</span>
                                : <div className="col-sm-12 text-center">
                                    <button className="btn btn-danger btn-md"
                                            onClick={onDelete(leave.id)}>Delete
                                    </button>
                                    <Link className="btn btn-primary btn-md" to={"/leave/update/" + leave.id}>Update</Link>
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
LeaveList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    leaves: PropTypes.object.isRequired
};