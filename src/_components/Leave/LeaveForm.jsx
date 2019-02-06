import React from 'react';
import PropTypes from 'prop-types';

export default function LeaveForm(props) {

    const {leave, submitted, submitting, onChange, onSubmit} = props;

    return (
        <div className="col-md-6 col-md-offset-3">
            <h2>Create Leave</h2>
            <form name="form" onSubmit={onSubmit}>
                <div className={'form-group' + (submitted && !leave.fromdate ? ' has-error' : '')}>
                    <label htmlFor="fromdate">FROM DATE</label>
                    <input type="date" className="form-control" name="fromdate" value={leave.fromdate}
                           onChange={onChange}/>
                    {submitted && !leave.fromdate &&
                    <div className="help-block">From Date is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !leave.todate ? ' has-error' : '')}>
                    <label htmlFor="todate">TO DATE</label>
                    <input type="date" className="form-control" name="todate" value={leave.todate} onChange={onChange}/>
                    {submitted && !leave.todate &&
                    <div className="help-block">To Date is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !leave.leavetype ? ' has-error' : '')}>
                    <label htmlFor="leavetype">Leave Type</label>

                    <select className="form-control" name="leavetype" onChange={onChange}>
                        <option value="0">Select type</option>
                        <option value="0" disabled="">---------------</option>
                        <option value="Special leave">Special leave</option>
                        <option value="Paid leave">Paid leave</option>
                        <option value="Sick leave">Sick leave</option>
                        <option value="National Holidays">National Holidays</option>
                        <option value="Religious Holidays">Religious Holidays</option>
                    </select>
                    {submitted && !leave.leavetype &&
                    <div className="help-block">Leave Type is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !leave.cause ? ' has-error' : '')}>
                    <label htmlFor="cause">Cause</label>
                    <textarea className="form-control" name="cause" onChange={onChange} defaultValue={leave.cause}/>
                    {submitted && !leave.cause &&
                    <div className="help-block">cause is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Sumbit</button>
                    {submitting &&
                    <img alt='loading'
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                    }
                </div>
            </form>
        </div>
    )
}

LeaveForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    leave: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    submitting: PropTypes.bool
};