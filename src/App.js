import React, {Component} from 'react';
import {Router, Route, Switch,Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from './_helpers';
import {alertActions} from './_actions';
import {PrivateRoute} from './_containers';
import {UserPage} from './_containers/UserPage';
import {LeavePage} from './_containers/LeavePage';
import {UserIdLeavePage} from './_containers/UserIdLeavePage';
import {LoginPage} from './_containers/LoginPage/LoginPage';
import {CreateUserPage} from './_containers/CreateUserPage';
import {CreateLeavePage} from './_containers/CreateLeavePage';
import {NotFoundPage} from './_containers/NotFoundPage';

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
                                        <PrivateRoute exact path="/users" component={UserPage}/>
                                        <PrivateRoute exact path="/leaves" component={LeavePage}/>
                                        <PrivateRoute exact path="/leave/create" component={CreateLeavePage}/>
                                        <PrivateRoute exact path="/user/:userid/leaves" component={UserIdLeavePage}/>
                                        <PrivateRoute exact path="/user/create" component={CreateUserPage}/>
                                        <Route exact path="/login" component={LoginPage}/>
                                        <Route path="" component={NotFoundPage}/>
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
