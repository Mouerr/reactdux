import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {datatableActions} from '../../_actions';
import DataTableContainer from "../DataTable";
import {userstate} from '../../_helpers/const_state';
import {userForm} from '../../forms/user';

class UserListContainer extends PureComponent {
    state = {
        page: 1,
        sizePerPage: 10,
        totalSize: 100,
    };

    componentDidMount() {
        this.props.dispatch(datatableActions.getAll('user'));
    }

    handleToggle = () => {
        this.props.dispatch(datatableActions.toggleModal());
    };

    handleDelete = id => {
        return (e) => this.props.dispatch(datatableActions.delete('user', id));
    };

    handleSubmit = object => {
        this.props.dispatch(datatableActions.create('user', object));
        this.handleToggle();
    };

    handleUpdate = editedRow => {
        this.props.dispatch(datatableActions.update('user', editedRow));
    };

    handleFilter = (conditions, page, sizePerPage, totalSize) => {
        this.props.dispatch(datatableActions.filter('user', conditions));
        this.setState({
            page,
            sizePerPage,
            totalSize
        });
    };

    render() {
        const {sizePerPage, page, totalSize} = this.state;
        const {items, loading, modal} = this.props;

        return (
            <DataTableContainer
                data={items}
                columns={userstate}
                form={userForm}
                loading={loading}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                onSubmit={this.handleSubmit}
                onUpdate={this.handleUpdate}
                onFilter={this.handleFilter}
                onToggle={this.handleToggle}
                onDelete={this.handleDelete}
                modal={modal}
            />
        );
    }
}

function mapStateToProps(state) {
    const {items, loading, modal} = state.datatable;
    return {
        items, loading, modal
    };
}

const connectedUserListContainer = connect(mapStateToProps)(UserListContainer);
export {connectedUserListContainer as UserListContainer};