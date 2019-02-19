import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, Col, FormGroup, Input, Label, Button, FormFeedback, Spinner
} from 'reactstrap';

export default function UserForm(props) {

    const {user, submitted, submitting, onChange, onSubmit} = props;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div className='pb-2 mt-4 mb-2'>
                        <h2>{user.id ? 'Update User' : 'Create User'}</h2>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <FormGroup row>
                            <Label sm={2}>Firstname</Label>
                            <Col sm={10}>
                                <Input type="text" name="firstname" value={user.firstname}
                                       onChange={onChange} invalid={!!(submitted && !user.firstname)}/>
                                {submitted && !user.firstname &&
                                <FormFeedback>Firstname is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Lastname</Label>
                            <Col sm={10}>
                                <Input type="text" name="lastname" value={user.lastname}
                                       onChange={onChange} invalid={!!(submitted && !user.lastname)}/>
                                {submitted && !user.lastname &&
                                <FormFeedback>Lastname is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input type="text" name="username" value={user.username}
                                       onChange={onChange} invalid={!!(submitted && !user.username)}/>
                                {submitted && !user.username &&
                                <FormFeedback>Username is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" placeholder="email@exmaple.com" value={user.email}
                                       onChange={onChange} invalid={!!(submitted && !user.email)}/>
                                {submitted && !user.email &&
                                <FormFeedback>Email is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" placeholder="*************"
                                       value={user.password} onChange={onChange} invalid={!!(submitted && !user.password)}/>
                                {submitted && !user.password &&
                                <FormFeedback>Password is required</FormFeedback>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{size: 6, offset: 2}}>
                                <Button color='primary'>Login</Button>
                                {submitting && <Spinner color="primary"/>}
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    )
}
UserForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    submitting: PropTypes.bool
};