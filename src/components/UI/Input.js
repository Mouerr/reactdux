import React from 'react';
import {Input, FormFeedback, FormGroup, Label} from 'reactstrap';

const input = (props) => {

    let inputElement = null;
    let feedbackErrors = (
        props.errorMessage.map((val, key) =>
            <FormFeedback key={key}>{val}</FormFeedback>
        )
    );

    switch (props.elementType) {
        case ('textarea'):
        case ('input'):
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={!!(props.invalid && props.shouldValidate && props.touched)}
            />;
            break;
        case ('select'):
            inputElement = (
                <Input type={props.elementType} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </Input>
            );
            break;
        /*case ('radio'):
            inputElement = (
                props.elementConfig.options.map((option,index) => (
                    <FormGroup key={index} check>
                        <Label check>
                            <Input type={props.elementType} value={props.value} name="radio" onChange={props.changed}/>{' '}
                            {option.value}
                        </Label>
                    </FormGroup>
                ))
            );
            break;*/
        default:
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return <div>{inputElement} {feedbackErrors}</div>;
};

export default React.memo(input);