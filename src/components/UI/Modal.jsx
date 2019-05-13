import React from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Spinner, Button
} from 'reactstrap';

import {formGenerator} from "../../forms/fGenerator";

const ModalC = props => {
    const {onSubmit, onChange, onToggle, modal,submitting, formIsValid, formElementsArray} = props;

    let form = formGenerator(formElementsArray, onChange);

    return <>
        <Modal isOpen={modal} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>Add New Row</ModalHeader>
            <Form onSubmit={onSubmit}>
                <ModalBody>
                    {form}
                </ModalBody>
                <ModalFooter>
                    <FormGroup check row>
                        {submitting ? <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> :
                            <Button color="primary" type='submit' disabled={!formIsValid}>Submit</Button>
                        }{' '}
                    </FormGroup>
                    <Button color="secondary" onClick={onToggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </>
};
export default React.memo(ModalC);