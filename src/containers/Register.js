import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {populateFormObject} from "../_helpers/utility";
import FormC from "../components/FormC";

const RegisterFormContainer = props => {
    const dispatch = useDispatch();
    const [formIsValid, setFormIsValid] = useState(false);
    const [formObject, setFormObject] = useState(props.formConfig);
    const submitting = useSelector(store => store.registration.submitting);

    const handleFormChange = (event, inputIdentifier) => {
        const formPopulation = populateFormObject(event, formObject, inputIdentifier);
        setFormObject(formPopulation['updatedForm']);
        setFormIsValid(formPopulation['formIsValid']);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (formIsValid) {
            const formData = {};
            for (let formElementIdentifier in formObject) {
                formData[formElementIdentifier] = formObject[formElementIdentifier].value;
            }
            dispatch(props.action.register(props.apiService, formData))
        }
    };

    const injectValue = (value, inputIdentifier) => {
        const formPopulation = populateFormObject(value, formObject, inputIdentifier, 'Inject');
        setFormObject(formPopulation['updatedForm']);
        setFormIsValid(formPopulation['formIsValid']);
    };

    return (
        <FormC
            formIsValid={formIsValid}
            formObject={formObject}
            title={props.title}
            submitting={submitting}
            onChange={handleFormChange}
            onInjectValue={injectValue}
            onSubmit={handleFormSubmit}
        />
    );
};

export default RegisterFormContainer;