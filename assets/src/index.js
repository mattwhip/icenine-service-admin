var React = require('react');
var ReactDOM = require('react-dom');
import { applyMiddleware, createStore } from 'redux';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { Provider } from 'react-redux';
import { all } from 'redux-saga/effects';
import axios from 'axios';
import axiosDriver from 'redux-saga-requests-axios';
import createSagaMiddleware from 'redux-saga';

import { component as App } from 'app';
import reducers from 'reducers'
import authSagas from 'sagas/auth';
import webSocketSagas from 'sagas/kafkaWebSocket';
import kafkaReaderSagas from 'sagas/kafkaReader';

// Compose requests middleware saga and app sagas to create root saga
function* rootSaga(axiosInstance) {
    yield createRequestInstance(axiosInstance, { driver: axiosDriver });
    yield all([
        watchRequests(),
        authSagas(),
        webSocketSagas(),
        kafkaReaderSagas(),
    ])
}

// Create middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store
const store = createStore(
    reducers.rootReducer,
    applyMiddleware(sagaMiddleware) 
);

// Create default settings for all axios handling here
const axiosInstance = axios.create({});

// Run saga middleware
sagaMiddleware.run(rootSaga, axiosInstance);

// Render the application
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
