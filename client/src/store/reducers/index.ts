import { combineReducers } from 'redux'
import cities from './cities'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['favouriteCities', 'recentResults'],
    blacklist: ['searchResult']
}

const persistedCities = persistReducer(persistConfig, cities)

export default combineReducers({
    cities: persistedCities,
})