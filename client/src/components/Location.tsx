import React, { FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Coord } from '../types';
import { locationTitle } from '../helpers';
import { searchCity } from '../store/actions/cities';
import { connect } from 'react-redux';

export interface LocationComponentProps {
    coord: Coord;
    country: string;
    name: string;
    searchCity?: (name: string) => void;
}

const LocationComponent: FC<LocationComponentProps> = ({ coord, country, name, searchCity }) => {
    return (
        <div className="location" title={locationTitle(coord)} onClick={() => searchCity(name)}>
            <ReactCountryFlag
                className="emojiFlag"
                countryCode={country}
                style={{
                    fontSize: '2em',
                    lineHeight: '2em',
                }}
            />
            <h2>{name}</h2>
        </div>
    );
};

export const Location = connect(null, { searchCity: (city) => searchCity({ city }) })(LocationComponent);
