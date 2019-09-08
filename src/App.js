import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {PrivateRoute} from './config/privateRoute';
import {routingParams} from './config/routingParams';
import {rolesRouting} from './config/rolesRouting';
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

    const loggedIn = useSelector(store => store.authentication.loggedIn);
    const user = JSON.parse(localStorage.getItem('user'));
    let mappingRoutes = [];
    let mappingNavbar = [];

    if (user) {
        for (const k in rolesRouting) {
            if (routingParams.hasOwnProperty(k) && user.roles[k] !== 'role denied' && typeof user.roles[k] !== 'undefined') {

                mappingRoutes.push(<PrivateRoute key={k} exact icons={routingParams[k].icons}
                                                 title={routingParams[k].title}
                                                 path={rolesRouting[k]} action={routingParams[k].action}
                                                 roleLevel={user.roles[k]}
                                                 container={routingParams[k].container}
                                                 apiService={routingParams[k].apiService}
                                                 formConfig={routingParams[k].formConfig}
                                                 dtConfig={routingParams[k].dtConfig}/>);
                if (routingParams[k].navbar) {
                    mappingNavbar.push(`${k}#${rolesRouting[k]}`);
                }
            }
        }
    }

    return (
        <div className="App">
            <Router history={history}>
                <Layout loggedIn={loggedIn} mappingNavbar={mappingNavbar}>
                    <Switch>
                        {mappingRoutes.map(prvRoute => {
                            return prvRoute
                        })}
                        <Route exact path="/logout" component={LogoutContainer}/>
                        {!loggedIn && <Route exact path="/login" component={LoginFormContainer}/>}
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