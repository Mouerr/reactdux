import React from 'react';
import InputC from "../components/UI/Input";
import {FormGroup, Label, Col} from 'reactstrap';

export const formGenerator = (objectForm, onChange) => {

    const formElementsArray = [];
    for (const key in objectForm) {
        formElementsArray.push({
            id: key,
            config: objectForm[key]
        });
    }

    return formElementsArray.map((formElement, index) => (
        <FormGroup key={index} row>
            <Label sm={3}>{formElement.config.label}</Label>
            <Col sm={9}>
                <InputC
                    key={formElement.id}
                    name={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    errorMessage={formElement.config.errorMessage}
                    touched={formElement.config.touched}
                    value={formElement.config.value}
                    changed={(event) => onChange(event, formElement.id)}
                />
            </Col>
        </FormGroup>
    ))

};