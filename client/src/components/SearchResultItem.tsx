import React, { FC, useEffect, useState } from 'react';
import { Location } from './Location';
import { WeatherIcon } from './WeatherIcon';
import { capitalize, toCelsius } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { SearchResult } from '../types';
import { CSSTransition } from 'react-transition-group';
import '../styles/transition.scss';

enum Transitions {
    add = 'add',
    cant_be_added = 'cant_be_added',
    remove = 'remove',
}

interface SearchResultItemProps {
    searchResult: SearchResult;
    addToFavourites?: (searchResult: SearchResult) => boolean | void;
    removeFromFavourites?: (name: string) => boolean | void;
    style?: any;
}
const ANIMATION_TIMEOUT = 300;
export const SearchResultItem: FC<SearchResultItemProps> = ({
    searchResult,
    addToFavourites,
    removeFromFavourites,
    style,
}) => {
    const [transition, setTransition] = useState(null);
    const [transitionClassName, setTransitionClassName] = useState('');

    const weather = searchResult && searchResult.weather;
    const main = searchResult && searchResult.main;
    const wind = searchResult && searchResult.wind;
    const coord = searchResult && searchResult.coord;

    const addToFavouritesWithTr = () => {
        if (addToFavourites(searchResult)) {
            setTransitionClassName(Transitions.add);
        } else {
            setTransitionClassName(Transitions.cant_be_added);
        }
        setTransition(true);
    };

    const removeFromFavouritesWithTr = () => {
        setTransitionClassName(Transitions.remove);
        setTransition(true);
        setTimeout(() => removeFromFavourites(searchResult.name), ANIMATION_TIMEOUT);
    };

    return (
        <CSSTransition
            in={!!transition}
            timeout={ANIMATION_TIMEOUT}
            classNames={transitionClassName}
            onEnter={() => {
                setTransition(null);
            }}
        >
            <div className="search-result-item" style={style}>
                <div className="search-result-content">
                    <Location coord={coord} country={searchResult.sys.country} name={searchResult.name} />
                    <div className="flex between">
                        <div>
                            {weather &&
                                weather.map((w, i) => (
                                    <div className="weather" key={`search-weather-${i}`}>
                                        <WeatherIcon type={w.icon} alt={w.description} />
                                        <h3>{capitalize(w.description)}</h3>
                                    </div>
                                ))}
                        </div>
                        {addToFavourites && (
                            <div className="favourite-button" title="Add to favourites">
                                <FontAwesomeIcon icon={faStar} onClick={addToFavouritesWithTr} />
                            </div>
                        )}
                    </div>
                    <div className="weather-stats">
                        <div className="temperature">
                            <span>{toCelsius(main.temp)}</span>
                            <div className="celsius" />
                            <div className="celsius-unit">C</div>
                        </div>
                        <div className="stats">
                            <div className="stats-item">
                                <span>Humidity</span>
                                <span>{main.humidity}%</span>
                            </div>
                            <div className="stats-item">
                                <span>Wind</span>
                                <span>{wind.speed} m/s</span>
                            </div>
                            <div className="stats-item">
                                <span>Pressure</span>
                                <span>{main.pressure} hpa</span>
                            </div>
                        </div>
                    </div>
                </div>
                {removeFromFavourites && <FontAwesomeIcon icon={faWindowClose} onClick={removeFromFavouritesWithTr} />}
            </div>
        </CSSTransition>
    );
};
