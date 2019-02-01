import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {UserPage} from '../_components/UserPage';
import {LeavePage} from '../_components/LeavePage';
import {UserIdLeavePage} from '../_components/UserIdLeavePage';
import {LoginPage} from '../_components/LoginPage';
import {CreateUserPage} from '../_components/CreateUserPage';
import {CreateLeavePage} from '../_components/CreateLeavePage';
import {NotFoundPage} from '../_components/NotFoundPage';

class App extends React.Component {
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
            <div className="jumbotron">
                <div className="container">
                    <div className="col-md-12">
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Switch>
                                    <PrivateRoute exact path="/users" component={UserPage}/>
                                    <PrivateRoute exact path="/leaves" component={LeavePage}/>
                                    <PrivateRoute exact path="/leave/create" component={CreateLeavePage}/>
                                    <PrivateRoute exact path="/user/:userid/leaves" component={UserIdLeavePage}/>
                                    <PrivateRoute exact path="/user/create" component={CreateUserPage}/>
                                    <Route exact path="/login" component={LoginPage}/>
                                    <Route path="" component={NotFoundPage} />
                                </Switch>
                            </div>
                        </Router>
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

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};