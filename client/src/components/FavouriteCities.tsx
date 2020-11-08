import React, { FC, useEffect } from 'react';
import { SearchResult } from '../types';
import { FavouriteItem } from './FavouriteItem';

export interface FavouriteCitiesComponentProps {
    favouriteCities: SearchResult[];
    removeFromFavourites: (name: string) => void;
    moveLocation: (indexes: number[]) => void;
    getWeatherForFavourites: () => void;
}
export const FavouriteCitiesComponent: FC<FavouriteCitiesComponentProps> = ({
    favouriteCities,
    removeFromFavourites,
    moveLocation,
    getWeatherForFavourites,
}) => {
    useEffect(() => {
        getWeatherForFavourites();
    }, []);

    return (
        <div className="column">
            {favouriteCities.map((f, i) => (
                <FavouriteItem
                    moveCard={moveLocation}
                    index={i}
                    key={`favourite-${f.name}`}
                    removeFromFavourites={removeFromFavourites}
                    searchResult={f}
                />
            ))}
        </div>
    );
};
