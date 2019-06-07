import React, {PureComponent} from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import CollapseC from './Collapse';

class CheckboxRadioC extends PureComponent {
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
            this.props.onInjectValue(this.state.results , this.props.name);
        }
    }

    render() {
        return (
            <>
                {Object.keys(this.props.labels).map((value, index) => {
                    return <CollapseC key={index} children={
                        <ButtonGroup key={index}>
                            {this.props.options.map((value1, index1) => {
                                return <Button key={index1} color="primary"
                                               name={value} value={value1}
                                               onClick={this.onRadioCheckboxBtnClick}
                                               active={(this.props.selectedValues ? this.props.selectedValues[value] : this.state.results[value]) === value1}
                                >
                                    {value1}</Button>
                            })}
                        </ButtonGroup>}
                                      label={value.toUpperCase()}>
                    </CollapseC>
                })}
            </>
        );
    }
}

export default CheckboxRadioC;