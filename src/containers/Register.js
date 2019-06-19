import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {populateFormObject} from "../_helpers/utility";
import FormC from "../components/FormC";

class RegisterFormContainer extends PureComponent {
    state = {
        formObject: this.props.formConfig,
        formIsValid: false,
    };

    handleFormChange = (event, inputIdentifier) => {
        const formPopulation = populateFormObject(event, this.state.formObject, inputIdentifier);
        this.setState({formObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        if (this.state.formIsValid) {
            const formData = {};
            for (let formElementIdentifier in this.state.formObject) {
                formData[formElementIdentifier] = this.state.formObject[formElementIdentifier].value;
            }
            this.props.dispatch(this.props.action.register(this.props.apiService, formData));
        }
    };

    injectValue = (value, inputIdentifier) => {
        const formPopulation = populateFormObject(value, this.state.formObject, inputIdentifier, 'Inject');
        this.setState({formObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    render() {
        const {submitting} = this.props;
        return (
            <FormC
                {...this.state}
                title={this.props.title}
                submitting={submitting}
                onChange={this.handleFormChange}
                onInjectValue={this.injectValue}
                onSubmit={this.handleFormSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    const {submitting} = state.registration;
    return {
        submitting
    };
}

const connectedRegisterFormContainer = connect(mapStateToProps)(RegisterFormContainer);
export {connectedRegisterFormContainer as RegisterFormContainer};