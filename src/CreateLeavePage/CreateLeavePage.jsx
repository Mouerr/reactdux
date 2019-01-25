import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { leaveActions } from '../_actions';
//import {userActions} from "../_actions/user.actions";

class CreateLeavePage extends React.Component {
    constructor(props) {
        super(props);

        let user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            leave: {
                id: uuid(),
                fromdate: '',
                todate: '',
                leavetype: '',
                cause: '',
                userId: user[0].id,
                token: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { leave } = this.state;
        this.setState({
            leave: {
                ...leave,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { leave } = this.state;
        const { dispatch } = this.props;
        if (leave.fromdate && leave.leavetype && leave.todate && leave.cause) {
            dispatch(leaveActions.create(leave));
        }
    }

    render() {
        const { submitting  } = this.props;
        const { leave, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Create Leave</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !leave.fromdate ? ' has-error' : '')}>
                        <label htmlFor="fromdate">FROM DATE</label>
                        <input type="date" className="form-control" name="fromdate" value={leave.fromdate} onChange={this.handleChange} />
                        {submitted && !leave.fromdate &&
                            <div className="help-block">From Date is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !leave.todate ? ' has-error' : '')}>
                        <label htmlFor="todate">TO DATE</label>
                        <input type="date" className="form-control" name="todate" value={leave.todate} onChange={this.handleChange} />
                        {submitted && !leave.todate &&
                        <div className="help-block">todate is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !leave.leavetype ? ' has-error' : '')}>
                        <label htmlFor="leavetype">Leave Type</label>
                        <input type="text" className="form-control" name="leavetype" value={leave.leavetype} onChange={this.handleChange} />
                        {submitted && !leave.leavetype &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !leave.cause ? ' has-error' : '')}>
                        <label htmlFor="cause">Cause</label>
                        <textarea className="form-control" name="cause" onChange={this.handleChange} defaultValue={leave.cause}/>
                        {submitted && !leave.cause &&
                            <div className="help-block">cause is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Sumbit</button>
                        {submitting &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { submitting } = state.creationleaves;
    return {
        submitting
    };
}

const connectedCreateLeavePage = connect(mapStateToProps)(CreateLeavePage);
export { connectedCreateLeavePage as CreateLeavePage };