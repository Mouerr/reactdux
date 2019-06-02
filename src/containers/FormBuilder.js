import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormC from '../components/FormC';
import {checkFormValidity} from "../forms/fValidator";

class FormBuilderContainer extends Component {
    state = {
        dt_object: this.props.formconfig,
        formIsValid: false,
    };

    componentDidMount() {
        if (this.props.match.url !== '/' + this.props.apiservice.objname + '/create') {
            const objId = this.props.match.params.objId;
            this.props.dispatch(this.props.action.read(this.props.apiservice, objId));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== '/' + this.props.apiservice.objname + '/create') {
            const {item} = this.props;
            if (item !== prevProps.item) {
                if (typeof item !== "undefined") {
                    const updatedForm = {
                        ...this.state.dt_object
                    };
                    for (const key in item) {
                        if (this.state.dt_object.hasOwnProperty(key)) {
                            const updatedFormElement = {
                                ...updatedForm[key]
                            };
                            updatedFormElement.value = item[key];
                            const checkValidity = checkFormValidity(updatedFormElement.value, updatedFormElement.validation);
                            updatedFormElement.valid = checkValidity.isValid;
                            updatedFormElement.errorMessage = checkValidity.errorMessage;
                            updatedFormElement.touched = true;
                            updatedForm[key] = updatedFormElement;
                        }
                    }
                    updatedForm['id'] = {
                        value: item['id'],
                        elementConfig: {
                            type: 'number',
                            hidden: true
                        },
                        valid: !!item['id'],
                    };
                    let formIsValid = true;
                    for (let inputIdentifier in updatedForm) {
                        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
                    }
                    this.setState({dt_object: updatedForm, formIsValid: formIsValid});
                }
            }
        }
    }

    handleFormChange = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.dt_object
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        const checkValidity = checkFormValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValidity.isValid;
        updatedFormElement.errorMessage = checkValidity.errorMessage;
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({dt_object: updatedForm, formIsValid: formIsValid});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.dt_object) {
            formData[formElementIdentifier] = this.state.dt_object[formElementIdentifier].value;
        }
        if (this.props.match.url === '/' + this.props.apiservice.objname + '/create') {
            this.props.dispatch(this.props.action.create(this.props.apiservice, formData));
        } else {
            this.props.dispatch(this.props.action.update(this.props.apiservice, formData));
        }
    };

    injectValue = (inputIdentifier, value) => {
        const updatedForm = {
            ...this.state.dt_object
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = value;

        const checkValidity = checkFormValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValidity.isValid;
        updatedFormElement.errorMessage = checkValidity.errorMessage;
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({dt_object: updatedForm, formIsValid: formIsValid});
    };

    render() {
        return (
            <FormC
                {...this.state}
                objname={this.props.apiservice.objname}
                submitting={this.props.submitting}
                onInjectValue={this.injectValue}
                onChange={this.handleFormChange}
                onSubmit={this.handleFormSubmit}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {submitting, item} = state[ownProps.apiservice.objname];
    return {
        submitting,
        item
    };
}

const connectedFormBuilderContainer = connect(mapStateToProps)(FormBuilderContainer);
export {connectedFormBuilderContainer as FormBuilderContainer};