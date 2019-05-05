import React, {Component} from 'react';
import {connect} from 'react-redux';
import {datatableActions} from '../../src/_actions';
import TimelineItem from "../components/Timeline";
import {Spinner} from 'reactstrap';

const TLSpinner = <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
}}>
    <Spinner style={{width: '5rem', height: '5rem'}}/>
</div>;

class TimelineContainer extends Component {

    componentDidMount() {
        this.props.dispatch(datatableActions.getAll(this.props.api));
    }

    render() {
        const items = this.props.items;
        return (
            items.length > 0 ? (
                <div className="timeline-container">
                    {items.map((data, idx) => (
                        <TimelineItem data={data} key={idx}/>
                    ))}
                </div>
            ) : TLSpinner
        )
    }
}

const mapStateToProps = state => {
    const {items, loading,} = state.datatable;
    return {
        items, loading
    };
};

const connectedTimelineContainer = connect(mapStateToProps)(TimelineContainer);
export {connectedTimelineContainer as TimelineContainer};