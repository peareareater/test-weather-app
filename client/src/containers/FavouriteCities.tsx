import React from 'react';
import { connect } from 'react-redux';
import { removeFromFavourites, searchCity, moveLocation, getWeatherForFavourites } from '../store/actions/cities';
import { FavouriteCitiesComponent, FavouriteCitiesComponentProps } from '../components/FavouriteCities';
import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Component: FC<FavouriteCitiesComponentProps> = (props) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <FavouriteCitiesComponent {...props} />
        </DndProvider>
    );
};
export const FavouriteCities = connect((state) => ({ favouriteCities: state.cities.favouriteCities }), {
    removeFromFavourites,
    searchCity,
    moveLocation,
    getWeatherForFavourites,
})(Component);
