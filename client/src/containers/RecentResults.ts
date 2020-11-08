import { connect } from 'react-redux';
import { addToFavourites } from '../store/actions/cities';
import { RecentResultsComponent } from '../components/RecentResults';

export const RecentResults = connect(
    (state) => {
        const { cities } = state;
        return { recentResults: cities.recentResults, favouriteCities: cities.favouriteCities.map((c) => c.name) };
    },
    { addToFavourites }
)(RecentResultsComponent);
