import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from './_helpers';
import {alertActions} from './_actions';
import {PrivateRoute} from './containers';
import {UserListContainer} from './containers/User';
import {LeaveListContainer} from './containers/Leave';
import {LoginFormContainer} from './containers/Login/Form';
import {UserFormContainer} from './containers/User';
import {LeaveFormContainer} from './containers/Leave';
import {NotFoundShowContainer} from './containers/NotFound';

class App extends Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="App">
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-md-12">
                            {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <Switch>
                                        <PrivateRoute exact path="/user/list" container={UserListContainer}/>
                                        <PrivateRoute exact path="/user/create" container={UserFormContainer}/>
                                        <PrivateRoute exact path="/user/update/:userid" container={UserFormContainer}/>
                                        <PrivateRoute exact path="/leave/list" container={LeaveListContainer}/>
                                        <PrivateRoute exact path="/leave/create" container={LeaveFormContainer}/>
                                        <PrivateRoute exact path="/leave/update/:leaveid" container={LeaveFormContainer}/>
                                        <PrivateRoute exact path="/user/:userid/leaves" container={LeaveListContainer}/>
                                        <Route exact path="/login" component={LoginFormContainer}/>
                                        <PrivateRoute path="" container={NotFoundShowContainer}/>
                                    </Switch>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
