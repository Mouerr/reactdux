import React from 'react';
import PropTypes from 'prop-types';
import {Form, Col, FormGroup, Input, Label, Button, FormFeedback, Spinner} from 'reactstrap';

const LeaveForm = props => {
    const {leave, submitted, submitting, onChange, onSubmit} = props;
    const leavetypes = ["Special leave", "Paid leave", "Sick leave", "National Holidays", "Religious Holidays"];
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div className='pb-2 mt-4 mb-2'>
                        <h2>{leave.id ? 'Update Leave' : 'Create Leave'}</h2>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <FormGroup row>
                            <Label sm={2}>From Date</Label>
                            <Col sm={10}>
                                <Input type="date" name="fromdate" value={leave.fromdate} onChange={onChange}
                                       invalid={!!(submitted && !leave.fromdate)}/>
                                {submitted && !leave.fromdate &&
                                <FormFeedback>From Date is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>To Date</Label>
                            <Col sm={10}>
                                <Input type="date" name="todate" value={leave.todate} onChange={onChange}
                                       invalid={!!(submitted && !leave.todate)}/>
                                {submitted && !leave.todate &&
                                <FormFeedback>To Date is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Type</Label>
                            <Col sm={10}>
                                <Input type="select" name="leavetype" value={leave.leavetype} onChange={onChange}
                                       invalid={!!(submitted && !leave.leavetype)}>
                                    <option value="0">Select option</option>
                                    {leavetypes.map((leavetype, index) =>
                                        <option value={leavetype} key={index}>{leavetype}</option>
                                    )}
                                </Input>
                                {submitted && !leave.leavetype &&
                                <FormFeedback>Type is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Cause</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="cause" value={leave.cause} onChange={onChange}
                                       invalid={!!(submitted && !leave.cause)}/>
                                {submitted && !leave.cause &&
                                <FormFeedback>Cause is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{size: 10, offset: 2}}>
                                <Button>Submit</Button>
                                {submitting && <Spinner color="primary"/>}
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    )
};

LeaveForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    leave: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    submitting: PropTypes.bool
};

export default LeaveForm;