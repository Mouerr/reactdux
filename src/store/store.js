import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './_reducers';

const loggerMiddleware = createLogger();

const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
);