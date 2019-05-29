import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {PrivateRoute} from './config/mapping';
import {routing} from './config/routing';
import {history} from './_helpers';
import Layout from "./components/UI/Layout";
import {alertActions, authenticationActions} from './store/_actions';
import {LoginFormContainer} from './containers/Auth/Login';
import {LogoutContainer} from './containers/Auth/Logout';
import PageNotFound from './components/PageNotFound';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret, faKey, faDoorOpen, faSignOutAlt, faFileCsv,
    faArrowCircleDown, faArrowCircleUp, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faArrowCircleDown, faArrowCircleUp, faKey, faDoorOpen, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus, faSignOutAlt, faFileCsv);

class App extends Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    componentDidMount() {
        this.props.dispatch(authenticationActions.authCheckState());
    }

    render() {
        const {alert, loggedIn} = this.props;
        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="App">
                <Router history={history}>
                    <Layout alert={alert} user={user} loggedIn={loggedIn}>
                        <Switch>
                            {user && routing.map((route, index) =>
                                user.roles.hasOwnProperty(route.roleName) && user.roles[route.roleName] !== 'role denied' &&
                                <PrivateRoute key={index} exact
                                              path={route.reactPath} icons={route.icons}
                                              container={route.container} apiservice={route.apiservice}
                                              formconfig={route.formconfig} dtconfig={route.dtconfig}/>
                            )}
                            <Route exact path="/logout" component={LogoutContainer}/>
                            <Route exact path="/login" component={LoginFormContainer}/>
                            <PrivateRoute path="" container={PageNotFound}/>
                        </Switch>
                    </Layout>
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
