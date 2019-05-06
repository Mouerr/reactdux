import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserForm from '../../components/User/Form';

import {userActions} from '../../store/_actions';

class UserFormContainer extends Component {
    state = {
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
    
    componentDidMount() {
        if (this.props.match.url !== '/user/create') {
            const userid = this.props.match.params.userid;
            this.props.dispatch(userActions.getById(userid));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== '/user/create') {
            if (this.props.users.item !== prevProps.users.item) {
                if (typeof this.props.users.item !== "undefined") {
                    const {users} = this.props;
                    this.setState({
                        user: {
                            id: users.item.id,
                            firstname: users.item.firstname,
                            lastname: users.item.lastname,
                            username: users.item.username,
                            email: users.item.email,
                            password: users.item.password
                        }
                    });
                }
            }
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        if (user.firstname && user.lastname && user.username && user.password && user.email) {
            if (this.props.match.url === '/user/create') {
                dispatch(userActions.create(user));
            } else {
                dispatch(userActions.update(user));
            }
        }
    };

    render() {
        const {submitting} = this.props;

        return (
            <UserForm
                {...this.state}
                submitting={submitting}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    const {submitting} = state.users;
    const {users} = state;
    return {
        submitting,
        users
    };
}

const connectedUserFormContainer = connect(mapStateToProps)(UserFormContainer);
export {connectedUserFormContainer as UserFormContainer};