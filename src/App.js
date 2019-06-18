import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {PrivateRoute} from './config/mapping';
import {routing} from './config/routing';
import {history} from './_helpers';
import Layout from "./components/UI/Layout";
import {alertActions, authenticationActions, registrationActions} from './store/_actions';
import {LoginFormContainer} from './containers/Auth/Login';
import {LogoutContainer} from './containers/Auth/Logout';
import PageNotFound from './components/PageNotFound';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret, faKey, faDoorOpen, faSignOutAlt, faFileCsv,
    faArrowCircleDown, faArrowCircleUp, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus,
} from '@fortawesome/free-solid-svg-icons';
import {registerForm} from "./forms/register";
import {Register} from "./api/register";
import {RegisterFormContainer} from "./containers/Register";

const allow_app_signup = process.env.REACT_APP_ALLOW_SIGNUP;

library.add(faUserSecret, faArrowCircleDown, faArrowCircleUp, faKey, faDoorOpen, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus, faSignOutAlt, faFileCsv);

class App extends Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.dispatch(alertActions.clear());
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
                                <PrivateRoute key={index} exact icons={route.icons}
                                              path={route.reactPath} action={route.action}
                                              container={route.container} apiservice={route.apiservice}
                                              formconfig={route.formconfig} dtconfig={route.dtconfig}/>
                            )}
                            <Route exact path="/logout" component={LogoutContainer}/>
                            <Route exact path="/login" component={LoginFormContainer}/>
                            {allow_app_signup === 'true' ? <Route exact path="/register" render={props => (
                                <RegisterFormContainer {...props}
                                                       title='Register new account'
                                                       apiservice={new Register()}
                                                       action={registrationActions}
                                                       formconfig={registerForm}/>
                            )}/> : ''}
                            <PrivateRoute path="" container={PageNotFound}/>
                        </Switch>
                    </Layout>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {alert, authentication: {loggedIn}} = state;
    return {
        alert, loggedIn
    };
};

export default connect(mapStateToProps)(App);
