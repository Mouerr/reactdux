import React from 'react';
import '../assets/css/TimeLine.css';
import Moment from 'react-moment';

const leaveTypeOptions = {
    'Special leave': '#1da1f2',
    'Paid leave': '#018f69',
    'Sick leave': '#e17b77',
    'National Holidays': '#ffdb14',
    'Religious Holidays': '#0a0a0a',
};

const TimelineItem = props => (
    <>
    <div className="timeline-item">
        <div className="timeline-item-content">
            <span className="tag" style={{background: leaveTypeOptions[props.data.leavetype]}}>
                {props.data.leavetype}
            </span>
            <time>◢ <Moment format="D MMM YYYY">{props.data.fromdate}</Moment></time>
            <time>◤ <Moment format="D MMM YYYY">{props.data.todate}</Moment></time>
            <p>{props.data.cause}</p>
            {props.data && (
                <a
                    href='/user/list'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    See profile
                </a>
            )}
            <span className="circle"/>
        </div>
    </div>
    </>
);

export default TimelineItem;