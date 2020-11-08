import ActionTypes from '../constants/index';

const MAX_RECENT_RESULTS = 10;
const initialState = {
    loading: false,
    searchResult: null,
    favouriteCities: [],
    recentResults: [],
};

export default function cities(state = initialState, { payload, type }) {
    switch (type) {
        case ActionTypes.SEARCH_CITY:
            return { ...state, loading: true, error: false, searchResult: null };
        case ActionTypes.SEARCH_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                searchResult: payload.result,
            };
        case ActionTypes.SEARCH_CITY_ERROR:
            return { ...state, loading: false, error: payload, searchResult: null };
        case ActionTypes.ADD_TO_RECENT:
            return {
                ...state,
                recentResults: [state.searchResult]
                    .concat(state.recentResults)
                    .filter((i) => i)
                    .slice(0, MAX_RECENT_RESULTS),
            };
        case ActionTypes.ADD_TO_FAVOURITES:
            const itemToAdd = payload || state.searchResult;
            if (state.favouriteCities.find((i) => i.name === itemToAdd.name)) {
                return state;
            }
            return {
                ...state,
                favouriteCities: state.favouriteCities.concat(itemToAdd),
            };
        case ActionTypes.REMOVE_FROM_FAVOURITES:
            return { ...state, favouriteCities: state.favouriteCities.filter((i) => i.name !== payload) };
        case ActionTypes.SET_FAVOURITES:
            return { ...state, favouriteCities: payload };
        case ActionTypes.MOVE_LOCATION:
            const favouriteCities = state.favouriteCities.slice();
            const dragged = favouriteCities.splice(payload[0], 1);
            favouriteCities.splice(payload[1], 0, dragged[0]);
            return { ...state, favouriteCities };
        default:
            return state;
    }
}
