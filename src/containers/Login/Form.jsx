import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from '../../components/Login/Form';

import {userActions} from '../../_actions';

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());
        this.props.dispatch(userActions.getAll());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {email, password} = this.state;
        const {dispatch} = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    render() {
        const {loggingIn} = this.props;
        return (
            <LoginForm
                {...this.state}
                loggingIn={loggingIn}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginFormContainer = connect(mapStateToProps)(LoginFormContainer);
export {connectedLoginFormContainer as LoginFormContainer};