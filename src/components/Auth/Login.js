import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, Col, FormGroup, Input, Label, Card, Button, CardHeader, CardBody, CardTitle, FormFeedback, Spinner,InputGroup,InputGroupAddon,InputGroupText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginForm = props => {
    const {loggingIn, email, password, submitted, onChange, onSubmit} = props;
    return (
        <Card style={{margin: '15%'}}>
            <CardHeader><h4><strong>Login</strong></h4></CardHeader>
            <CardBody>
                <CardTitle>Sign In to your account</CardTitle>

                <Form onSubmit={onSubmit}>

                    <FormGroup row>
                        <Label sm={2}>Email</Label>
                        <Col sm={6}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon="user-secret" size="lg"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type="email" name="email" placeholder="email@exmaple.com" value={email}
                                       onChange={onChange} invalid={!!(submitted && !email)}/>
                                {submitted && !email &&
                                <FormFeedback>Email is required</FormFeedback>
                                }
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Password</Label>
                        <Col sm={6}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon="key" size="lg"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input type="password" name="password" placeholder="*************"
                                   value={password} onChange={onChange} invalid={!!(submitted && !password)}/>
                            {submitted && !password &&
                            <FormFeedback>Password is required</FormFeedback>
                            }
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{offset: 2}}>
                            <Button color='primary'><FontAwesomeIcon icon="door-open" size="lg"/>Login</Button>
                            {loggingIn &&
                            <Spinner color="primary"/>}
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    )
};

const isEmail = (props, propName, componentName) => {
    const regex = /^((([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))?$/;

    if (!regex.test(props[propName])) {
        return new Error(`Invalid prop \`${propName}\` passed to \`${componentName}\`. Expected a valid email address.`);
    }
};

LoginForm.propTypes = {
    email: isEmail,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool,
    submitted: PropTypes.bool.isRequired
};

export default React.memo(LoginForm);