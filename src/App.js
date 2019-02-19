import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Row, Col, Alert} from 'reactstrap';

import {history, registered_routes, PrivateRoute} from './_helpers';
import {alertActions} from './_actions';
import {LoginFormContainer} from './containers/Login/Form';
import {NotFoundShowContainer} from './containers/NotFound';

import AppNavbar from './components/AppNavbar'

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
                <Router history={history}>
                    <React.Fragment>

                        <AppNavbar loggedIn={loggedIn} user={user} registered_routes={registered_routes}/>

                        <Container>
                            {alert.message && <Row>
                                <Col sm="12">
                                    <Alert color={alert.type}>
                                        {alert.message}
                                    </Alert>
                                </Col>
                            </Row>}
                            <div className="col-md-12">
                                <Switch>
                                    {user && registered_routes.map((route, index) =>
                                        user.routes && user.routes.indexOf(route.path) !== -1 &&
                                        <PrivateRoute key={index} exact path={route.path}
                                                      container={route.container}/>
                                    )}
                                    <Route exact path="/login" component={LoginFormContainer}/>
                                    <PrivateRoute path="" container={NotFoundShowContainer}/>
                                </Switch>
                            </div>
                        </Container>
                    </React.Fragment>
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
