import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormC from '../components/FormC';
import {checkFormValidity} from "../forms/fValidator";
import {populateFormObject} from "../_helpers/utility";

class FormBuilderContainer extends Component {
    state = {
        formObject: this.props.formConfig,
        formIsValid: false,
    };

    componentDidMount() {
        const {apiService, action, dispatch, match} = this.props;
        if (match.url !== `/${apiService.objName}/create`) {
            const objId = match.params.objId;
            dispatch(action.read(apiService, objId));
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.formObject !== this.state.formObject || nextProps.item !== this.props.item;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== `/${this.props.apiService.objName}/create`) {
            const {item} = this.props;
            if (item !== prevProps.item) {
                if (typeof item !== "undefined") {
                    const updatedForm = {
                        ...this.state.formObject
                    };
                    for (const key in item) {
                        if (this.state.formObject.hasOwnProperty(key)) {
                            const updatedFormElement = {
                                ...updatedForm[key]
                            };
                            updatedFormElement.value = item[key];
                            const checkValidity = checkFormValidity(updatedFormElement.value, updatedFormElement.validation);
                            updatedFormElement.valid = checkValidity.isValid;
                            updatedFormElement.errorMessage = checkValidity.errorMessage;
                            updatedFormElement.touched = true;
                            updatedForm[key] = updatedFormElement;
                        } else {
                            updatedForm[key] = {
                                value: item[key],
                                elementConfig: {
                                    hidden: true
                                },
                                valid: !!item[key],
                            };
                        }
                    }
                    let formIsValid = true;
                    for (let inputIdentifier in updatedForm) {
                        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
                    }
                    this.setState({formObject: updatedForm, formIsValid: formIsValid});
                }
            }
        }
    }

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
            const {apiService, action, dispatch, match} = this.props;
            if (match.url === `/${apiService.objName}/create`) {
                dispatch(action.create(apiService, formData));
            } else {
                dispatch(action.update(apiService, formData));
            }
        }
    };

    injectValue = (value, inputIdentifier) => {
        const formPopulation = populateFormObject(value, this.state.formObject, inputIdentifier, 'Inject');
        this.setState({formObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
    };

    render() {
        console.log('form builder rendered');
        const {submitting, title} = this.props;
        const {handleFormChange, injectValue, handleFormSubmit} = this;
        return (
            <FormC
                {...this.state}
                title={title}
                submitting={submitting}
                onInjectValue={injectValue}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {submitting, item} = state[ownProps.apiService.objName];
    return {
        submitting,
        item
    };
}

const connectedFormBuilderContainer = connect(mapStateToProps)(FormBuilderContainer);
export {connectedFormBuilderContainer as FormBuilderContainer};