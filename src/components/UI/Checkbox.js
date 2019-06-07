import React, {Component} from 'react';
import {Button, ButtonGroup} from 'reactstrap';

class CheckboxC extends Component {
    state = {results: []};

    onCheckboxBtnClick = (selected) => {
        const index = this.state.results.indexOf(selected);
        if (index < 0) {
            this.state.results.push(selected);
        } else {
            this.state.results.splice(index, 1);
        }
        this.setState({results: [...this.state.results]});
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedValues !== '') {
            return {
                results: nextProps.selectedValues
            };
        }
        return [];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.results !== this.state.results) {
            this.props.onInjectValue(this.state.results, this.props.name);
        }
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    {this.props.options.map((value, index) =>
                        <Button color="primary" key={index}
                                onClick={() => this.onCheckboxBtnClick(value)}
                                active={this.props.selectedValues.includes(value)}>{value}</Button>
                    )}
                </ButtonGroup>
            </div>
        );
    }
}

export default React.memo(CheckboxC);