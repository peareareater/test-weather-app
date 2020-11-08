import { connect } from 'react-redux';
import { searchCity, addToFavourites } from '../store/actions/cities';
import { SearchResultComponent } from '../components/SearchResult';

export const SearchResult = connect(
    (state) => {
        const { cities } = state;
        return {
            searchResult: cities.searchResult,
            loading: cities.loading,
            favouriteCities: cities.favouriteCities.map((i) => i.name),
        };
    },
    { searchCity, addToFavourites }
)(SearchResultComponent);
