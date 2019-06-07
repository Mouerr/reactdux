import React from 'react';
import {Input, FormFeedback, FormGroup, Label} from 'reactstrap';
import CheckboxRadioC from "../UI/CheckboxRadio";
import CheckboxC from "./Checkbox";
import Select from 'react-select';
import {jsUcFirst} from "../../_helpers/utility";

const InputC = (props) => {
    let inputElement = null;
    let feedbackErrors = props.errorMessage && props.errorMessage.map((val, key) =>
        <FormFeedback key={key}>{val}</FormFeedback>
    );

    switch (props.elementType) {
        case ('textarea'):
        case ('input'):
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={!!(props.invalid && props.shouldValidate && props.touched)}/>;
            break;
        case ('select'):
            inputElement = <Input type={props.elementType}
                                  value={props.value}
                                  onChange={props.changed}
                                  invalid={!!(props.invalid && props.shouldValidate && props.touched)}>
                <option value="">Select an option</option>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))} </Input>;
            break;
        case ('reactMultiSelect'):
            const multiSelectValue = props.value && Object.assign([], props.value.map(val =>({value: val, label: jsUcFirst(val)})));

            inputElement = <Select
                name={props.name}
                value={multiSelectValue}
                isMulti
                isSearchable
                options={props.elementConfig.options}
                onChange={props.changed}
            />;
            break;
        case ('reactSelect'):
            const selectValue = [{value: props.value, label: jsUcFirst(props.value)}];
            inputElement = <Select
                name={props.name}
                placeholder='test'
                value={selectValue}
                onChange={props.changed}
                options={props.elementConfig.options}
                isSearchable
                isClearable
            />;
            break;
        case ('checkbox'):
            inputElement = <CheckboxC
                name={props.name}
                options={props.elementConfig.options}
                selectedValues={props.value}
                onInjectValue={props.onInjectValue}
            />;
            break;
        case ('radio'):
            inputElement = props.elementConfig.options.map((option, index) => (
                <FormGroup key={index} check>
                    <Label check>
                        <Input type={props.elementType}
                               checked={props.value === option}
                               value={option} name={props.name}
                               onChange={props.changed}/>{' '}
                        {option}
                    </Label>
                </FormGroup>
            ));
            break;
        case ('checkbox-radio'):
            inputElement = <CheckboxRadioC
                name={props.name}
                labels={props.elementConfig.labels}
                options={props.elementConfig.options}
                selectedValues={props.value}
                onInjectValue={props.onInjectValue}
            />;
            break;
        default:
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return <div>{inputElement} {feedbackErrors}</div>;
};

export default InputC;