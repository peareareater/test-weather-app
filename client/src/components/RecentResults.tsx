import React, { FC } from 'react';
import { Coord, SearchResult } from '../types';
import { SearchResultItem } from './SearchResultItem';

interface RecentResultsComponentProps {
    recentResults: SearchResult[];
    searchCity: (coord: Coord) => void;
    favouriteCities: string[];
    addToFavourites: (searchResult: SearchResult) => void;
}
export const RecentResultsComponent: FC<RecentResultsComponentProps> = ({
    recentResults = [],
    addToFavourites,
    favouriteCities,
}) => {
    const isFavourite = (name: string) => !!favouriteCities.find((i) => i === name);
    const addToFavouritesWithCheck = (searchResult: SearchResult) => {
        if (!isFavourite(searchResult.name)) {
            addToFavourites(searchResult);
            return true;
        }
        return false;
    };
    return (
        <div className="column">
            {recentResults.map((r, i) => (
                <div key={`recent-${r.name}-${i}`} className={`content-wrapper`}>
                    <SearchResultItem
                        searchResult={r}
                        addToFavourites={addToFavouritesWithCheck}
                        isFavourite={isFavourite(r.name)}
                    />
                </div>
            ))}
        </div>
    );
};
