import React, {Component} from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {history, registered_routes, PrivateRoute} from './_helpers';
import {alertActions} from './_actions';
import {LoginFormContainer} from './containers/Login/Form';
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
        const {alert, loggedIn} = this.props;
        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="App">
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        {loggedIn && <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <Link to="#" className="navbar-brand">REACT LOGIN</Link>
                                </div>
                                <ul className="nav navbar-nav">
                                    {user && registered_routes.map((route, index) =>
                                        user.routes && user.routes.indexOf(route.path) !==-1 && route.navbar &&
                                        <li key={index}><Link to={route.path}>{route.label}</Link></li>
                                    )}
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/login"><span
                                        className="glyphicon glyphicon-log-out"/> Logout</Link></li>
                                </ul>
                            </div>
                        </nav>}
                        <div className="container">
                            <div className="col-md-12">
                                <Switch>
                                    {user && registered_routes.map((route, index) =>
                                        user.routes && user.routes.indexOf(route.path) !==-1 &&
                                        <PrivateRoute key={index} exact path={route.path} container={route.container}/>
                                    )}
                                    <Route exact path="/login" component={LoginFormContainer}/>
                                    <PrivateRoute path="" container={NotFoundShowContainer}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {loggedIn} = state.authentication;

    return {
        alert, loggedIn
    };
}

export default connect(mapStateToProps)(App);
