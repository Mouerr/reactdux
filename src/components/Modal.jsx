import React from 'react';
import {
    Button, Col, Input, Label,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, FormFeedback
} from 'reactstrap';

const ModalC = props => {
    const {dt_object, columns, onSubmit, onChange, onToggle, modal, submitted, title} = props;
    console.log('render modal');
    return <div>
        <Button onClick={onToggle} color="primary">{title}</Button>
        <Modal isOpen={modal} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>{title}</ModalHeader>
            <Form onSubmit={onSubmit}>
                <ModalBody>
                    {columns.map((val, index) =>
                        <FormGroup key={index} row>
                            {val.text !== 'Actions' && <Label sm={3}>{val.text}</Label>}
                            <Col sm={9}>
                                {val.type !== 'select' && val.text !== 'Actions' &&
                                <Input type={val.type} name={val.dataField} placeholder={val.text}
                                       value={dt_object[val.dataField]} onChange={onChange}
                                       invalid={!!(submitted && !dt_object[val.dataField])}/>}

                                {val.type === 'select' &&
                                <Input type={val.type} name={val.dataField} placeholder={val.text}
                                       value={dt_object[val.dataField]} onChange={onChange}
                                       invalid={!!(submitted && !dt_object[val.dataField])}>
                                    <option value="0">Select option</option>
                                    {val.editor.options.map((leavetype, index) =>
                                        <option value={leavetype.value}
                                                key={index}>{leavetype.label}</option>
                                    )}
                                </Input>}
                                {submitted && !dt_object[val.dataField] &&
                                <FormFeedback>{val.text} is required</FormFeedback>}
                            </Col>
                        </FormGroup>
                    )}
                </ModalBody>
                <ModalFooter>
                    <FormGroup check row>
                        <Button color="primary" type='submit'>Submit</Button>{' '}</FormGroup>
                    <Button color="secondary" onClick={onToggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </div>
};
export default ModalC;