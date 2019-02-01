import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {leaveActions} from '../../_actions';

class UserIdLeavePage extends React.Component {
    componentDidMount() {
        const userid = this.props.match.params.userid;
        this.props.dispatch(leaveActions.getByUserid(userid));
    }

    handleDeleteleave(id) {
        return (e) => this.props.dispatch(leaveActions.delete(id));
    }

    render() {
        const {leaves} = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="col-md-12">
                <h3>{user.firstname + ' ' + user.lastname} leaves:</h3>

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
                                    : <span> - <a onClick={this.handleDeleteleave(leave.id)}>Delete</a></span>
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
    const {leaves} = state;
    return {
        leaves
    };
}

const connectedUserIdLeavePage = connect(mapStateToProps)(UserIdLeavePage);
export {connectedUserIdLeavePage as UserIdLeavePage};