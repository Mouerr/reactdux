import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class CollapseC extends Component {
    state = {
        collapse: false
    };

    toggle = () => {
        this.setState(state => ({collapse: !state.collapse}));
    };

    render() {
        return (
            <>
                <Button color="secondary" size="lg" block onClick={this.toggle}>{this.props.label}
                    <FontAwesomeIcon icon={this.state.collapse ? "arrow-circle-up" : "arrow-circle-down"}/>
                </Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            {this.props.children}
                        </CardBody>
                    </Card>
                </Collapse>
            </>
        );
    }
}

export default CollapseC;
