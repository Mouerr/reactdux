import React, {Component} from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import CollapseC from './Collapse';

class CheckboxRadioC extends Component {

    state = {
        results: this.props.labels
    };

    onRadioCheckboxBtnClick = event => {
        const {name, value} = event.target;
        this.setState({
            results: {
                ...this.state.results,
                [name]: value
            }
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.results !== this.state.results) {
            this.props.onInjectValue(this.props.name, this.state.results);
        }
    }

    render() {
        return (
            <>
                {Object.keys(this.state.results).map((value, index) => {
                    const label = value.toUpperCase();
                    return <CollapseC key={index} children={
                        <ButtonGroup key={index}>
                            {this.props.options.map((value1, index1) => {
                                return <Button key={index1} color="primary"
                                               name={value} value={value1}
                                               onClick={this.onRadioCheckboxBtnClick}
                                               active={this.state.results[value] === value1}>{value1}</Button>
                            })}
                        </ButtonGroup>}
                                      label={label}>
                    </CollapseC>
                })}
            </>
        );
    }
}

export default CheckboxRadioC;