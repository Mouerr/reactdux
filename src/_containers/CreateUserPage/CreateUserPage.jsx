import React from 'react';
import {connect} from 'react-redux';
import UserForm from '../../_components/User/UserForm';

import {userActions} from '../../_actions';
import LeaveForm from "../CreateLeavePage/CreateLeavePage";

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                token: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        if (user.firstname && user.lastname && user.username && user.password) {
            dispatch(userActions.create(user));
        }
    }

    render() {
        const {creating} = this.props;
        return (
            <UserForm
                {...this.state}
                creating={creating}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    const {creating} = state.userCreation;
    return {
        creating
    };
}

const connectedCreateUserPage = connect(mapStateToProps)(CreateUserPage);
export {connectedCreateUserPage as CreateUserPage};