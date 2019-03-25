import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {datatableActions} from '../../_actions';
import DataTableContainer from "../DataTable";
import {leavestate} from '../../_helpers/const_state';

class LeaveListContainer extends PureComponent {
    state = {
        page: 1,
        sizePerPage: 10,
        totalSize: 100,
        columns: leavestate
    };

    componentDidMount() {
        if (this.props.match.url === '/leave/list') {
            this.props.dispatch(datatableActions.getAll('leave'));
        } else {
            const userid = this.props.match.params.userid;
            this.props.dispatch(datatableActions.getByUserid(userid));
        }
    }

    handleToggle = () => {
        this.props.dispatch(datatableActions.toggleModal());
    };

    handleDelete = id => {
        return (e) => this.props.dispatch(datatableActions.delete('leave', id));
    };

    handleSubmit = object => {
        this.props.dispatch(datatableActions.create('leave', object));
        this.handleToggle();
    };

    handleUpdate = editedRow => {
        this.props.dispatch(datatableActions.update('leave', editedRow));
    };

    handleFilter = (conditions, page, sizePerPage, totalSize) => {
        this.props.dispatch(datatableActions.filter('leave', conditions));

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
                columns={this.state.columns}
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

const connectedLeaveListContainer = connect(mapStateToProps)(LeaveListContainer);
export {connectedLeaveListContainer as LeaveListContainer};