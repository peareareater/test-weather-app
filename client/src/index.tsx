import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import createStore from './store/index';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = createStore();
const rootEl = document.getElementById('app');

render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    rootEl
);

if (module.hot) {
    module.hot.accept();
}
