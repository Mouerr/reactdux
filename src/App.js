import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {PrivateRoute} from './config/mapping';
import {routing} from './config/routing';
import {history} from './_helpers';
import Layout from "./components/UI/Layout";
import {/*alertActions,*/ authenticationActions, registrationActions} from './store/_actions';
import {LoginFormContainer} from './containers/Auth/Login';
import LogoutContainer from './containers/Auth/Logout';
import PageNotFound from './components/PageNotFound';
import {registerForm} from "./forms/register";
import {Register} from "./api/register";
import RegisterFormContainer from "./containers/Register";

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret, faKey, faDoorOpen, faSignOutAlt, faFileCsv,
    faArrowCircleDown, faArrowCircleUp, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faArrowCircleDown, faArrowCircleUp, faKey, faDoorOpen, faUserMinus, faUserPlus, faCalendarPlus, faCalendarMinus, faSignOutAlt, faFileCsv);

const allowAppSignUp = process.env.REACT_APP_ALLOW_SIGNUP;

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            //dispatch(alertActions.clear());
        });
        dispatch(authenticationActions.authCheckState())
    }, [dispatch]);

    const alert = useSelector(store => store.alert);
    const loggedIn = useSelector(store => store.authentication.loggedIn);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="App">
            <Router history={history}>
                <Layout alert={alert} user={user} loggedIn={loggedIn}>
                    <Switch>
                        {user && routing.map((route, index) =>
                            user.roles.hasOwnProperty(route.roleName) && user.roles[route.roleName] !== 'role denied' &&
                            <PrivateRoute key={index} exact icons={route.icons} title={route.title}
                                          path={route.reactPath} action={route.action}
                                          roleLevel={user.roles[route.roleName]}
                                          container={route.container} apiService={route.apiService}
                                          formConfig={route.formConfig} dtConfig={route.dtConfig}/>
                        )}
                        <Route exact path="/logout" component={LogoutContainer}/>
                        <Route exact path="/login" component={LoginFormContainer}/>
                        {allowAppSignUp === 'true' ? <Route exact path="/register" render={props => (
                            <RegisterFormContainer {...props}
                                                   title='Register new account'
                                                   apiService={new Register()}
                                                   action={registrationActions}
                                                   formConfig={registerForm}/>
                        )}/> : ''}
                        <PrivateRoute path="" container={PageNotFound}/>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
};

export default React.memo(App);