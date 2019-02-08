import React from 'react';
import {connect} from 'react-redux';

class NotFoundShowContainer extends React.Component {

    render() {
        return (
            <div>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        )
    }
}

const connectedNotFoundShowContainer = connect()(NotFoundShowContainer);
export {connectedNotFoundShowContainer as NotFoundShowContainer};