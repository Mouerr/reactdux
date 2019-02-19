import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Table} from 'reactstrap';

export default function LeaveList(props) {

    const {leaves, onDelete} = props;

    return (
        <React.Fragment>
            <div className='pb-2 mt-4 mb-2'>
                <h3>Leaves List:</h3>
            </div>
            {leaves.loading && <em>Loading leaves...</em>}
            {leaves.error && <span className="text-danger">ERROR: {leaves.error}</span>}
            {leaves.items &&
            <Table hover striped responsive>
                <thead>
                <tr>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Leave Type</th>
                    <th>Cause</th>
                    <th className='text-center'>Actions</th>
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
                                    <Button color='danger' onClick={onDelete(leave.id)}>Delete</Button>{' '}
                                    <Button color='primary' tag={Link} to={"/leave/update/" + leave.id}>Update</Button>
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
LeaveList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    leaves: PropTypes.object.isRequired
};