import React, { FC, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Coord, SearchResult } from '../types';
import { Loading } from './Loading';
import { NoResults } from './NoResults';
import '../styles/search-result.scss';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultComponentProps {
    searchResult: SearchResult;
    searchCity: (coord: Coord) => void;
    addToFavourites: () => void;
    favouriteCities: string[];
    loading: boolean;
}
export const SearchResultComponent: FC<SearchResultComponentProps> = ({
    searchResult,
    loading,
    searchCity,
    addToFavourites,
    favouriteCities,
}) => {
    const coord = searchResult && searchResult.coord;

    const renderMarkers = (map, maps) => {
        new maps.Marker({
            position: { lat: coord.lat, lng: coord.lon },
            map,
            title: searchResult.name,
        });
    };

    const addToFavouritesWithCheck = () => {
        if (!favouriteCities.find((i) => i === searchResult.name)) {
            addToFavourites();
            return true;
        }
        return false;
    };

    const handleMapClick = ({ lat, lng, event }) => searchCity({ lat, lon: lng });
    return (
        <div className="column">
            <div className="column-content">
                {searchResult && !loading && (
                    <div style={{ height: '100%' }}>
                        <SearchResultItem
                            searchResult={searchResult}
                            addToFavourites={addToFavouritesWithCheck}
                            style={{ marginLeft: -10 }}
                        />
                        <div className="map-container">
                            <div style={{ height: '70vh', width: '100%' }}>
                                <GoogleMapReact
                                    onClick={handleMapClick}
                                    defaultCenter={{ lat: coord.lat, lng: coord.lon }}
                                    defaultZoom={8}
                                    yesIWantToUseGoogleMapApiInternals
                                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {!searchResult && loading && <Loading />}
                {!searchResult && !loading && <NoResults />}
            </div>
        </div>
    );
};
