import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormC from '../components/FormC';
import {checkFormValidity} from "../forms/fValidator";
import {populateFormObject} from "../_helpers/utility";

class FormBuilderContainer extends Component {
    state = {
        formObject: this.props.formconfig,
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

        const formData = {};
        for (let formElementIdentifier in this.state.formObject) {
            formData[formElementIdentifier] = this.state.formObject[formElementIdentifier].value;
        }
        if (this.props.match.url === '/' + this.props.apiservice.objname + '/create') {
            this.props.dispatch(this.props.action.create(this.props.apiservice, formData));
        } else {
            this.props.dispatch(this.props.action.update(this.props.apiservice, formData));
        }
    };

    injectValue = (value, inputIdentifier) => {
        const formPopulation = populateFormObject(value, this.state.formObject, inputIdentifier, 'Inject');
        this.setState({formObject: formPopulation['updatedForm'], formIsValid: formPopulation['formIsValid']});
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