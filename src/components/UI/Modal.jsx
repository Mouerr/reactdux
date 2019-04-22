import React from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup/*, Spinner*/, Button
} from 'reactstrap';

import {formGenerator} from "../../_helpers/form-generator";

const ModalC = props => {
    const {onSubmit, onChange, onToggle, modal, formIsValid, title, formElementsArray} = props;

    let form = formGenerator(formElementsArray, onChange);
//<Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
    return <div>
        <Button onClick={onToggle} color="primary">{title}</Button>
        <Modal isOpen={modal} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>{title}</ModalHeader>
            <Form onSubmit={onSubmit}>
                <ModalBody>
                    {form}
                </ModalBody>
                <ModalFooter>
                    <FormGroup check row>
                        <Button color="primary" type='submit' disabled={!formIsValid}>Submit</Button>{' '}</FormGroup>
                    <Button color="secondary" onClick={onToggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </div>
};
export default React.memo(ModalC);