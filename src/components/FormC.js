import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Form, Col, FormGroup/*,Row*/, Spinner
} from 'reactstrap';
import {formGenerator} from "../forms/fGenerator";

const FormC = (props) => {

    const {formObject, submitting, onChange, onSubmit, onInjectValue, formIsValid, title} = props;

    let form = formGenerator(formObject, onChange, onInjectValue);
    return (
        <>
            <div className='pb-2 mt-4 mb-2'>
                <h2>{title}</h2>
            </div>
            <Form onSubmit={onSubmit}>
                {form}
                <FormGroup check row>
                    <Col sm={{size: 4, offset: 4}}>
                        {submitting ? <Spinner style={{width: '3rem', height: '3rem'}} type="grow"/> :
                            <Button size="lg" color="primary" type='submit' disabled={!formIsValid}>Submit</Button>
                        }{' '}
                    </Col>
                </FormGroup>
            </Form>
        </>
    )
};
FormC.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onInjectValue: PropTypes.func.isRequired,
    formObject: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    formIsValid: PropTypes.bool,
    title: PropTypes.string.isRequired
};

export default FormC;