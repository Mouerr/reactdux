import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './assets/css/custom.css'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/store'
import * as serviceWorker from './serviceWorker'
require('dotenv').config();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
