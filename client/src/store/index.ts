import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'

export default () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return { store, persistor };
};
