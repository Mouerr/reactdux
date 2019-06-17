import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {authenticationActions} from '../../store/_actions/authentication';

class LogoutContainer extends Component {
    componentDidMount () {
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/login"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authenticationActions.logout())
    };
};

const connectedLogoutFormContainer = connect(null, mapDispatchToProps)(LogoutContainer);
export {connectedLogoutFormContainer as LogoutContainer};