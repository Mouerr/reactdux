import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class NotFoundPage extends React.Component {

    render() {
        return (
            <div>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        )
    }
}

const connectedNotFoundPage = connect()(NotFoundPage);
export {connectedNotFoundPage as NotFoundPage};