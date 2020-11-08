import actionTypes, { API_URL } from '../constants/index';
import axios from 'axios';

let cancelToken;

export const searchCity = (params) => {
    return (dispatch, getState) => {
        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel('Too many requests');
        }

        dispatch(addToRecent());
        cancelToken = axios.CancelToken.source();

        dispatch(searchCityStart());

        axios
            .get(`${API_URL}/weather`, { params, cancelToken: cancelToken.token })
            .then((res) => {
                dispatch(searchCitySuccess(res.data));
            })
            .catch((err) => {
                dispatch(searchCityError(err.message));
            });
    };
};

export const getWeatherForFavourites = () => {
    return (dispatch, getState) => {
        const state = getState();
        const favourites = state.cities.favouriteCities.map((f) => f.coord);
        axios
            .post(`${API_URL}/weather-multiple`, { favourites })
            .then((res) => {
                setFavourites(res.data.result);
            })
            .catch((err) => {
                dispatch(searchCityError(err.message));
            });
    };
};

export const moveLocation = (indexes: number[]) => ({
    type: actionTypes.MOVE_LOCATION,
    payload: indexes,
});

export const setFavourites = (payload) => ({ type: actionTypes.SET_FAVOURITES, payload });
export const addToFavourites = (payload) => ({ type: actionTypes.ADD_TO_FAVOURITES, payload });
export const removeFromFavourites = (name: string) => ({ type: actionTypes.REMOVE_FROM_FAVOURITES, payload: name });
const addToRecent = () => ({ type: actionTypes.ADD_TO_RECENT });
const searchCityStart = () => ({ type: actionTypes.SEARCH_CITY });
const searchCitySuccess = (payload) => ({ type: actionTypes.SEARCH_CITY_SUCCESS, payload });
const searchCityError = (payload?) => ({ type: actionTypes.SEARCH_CITY_ERROR, payload });
