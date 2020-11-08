import { Coord } from '../types';

export const capitalize = (str: string) => {
    return str
        .split(' ')
        .map((i) => `${i.substr(0, 1).toUpperCase()}${i.slice(1, i.length)}`)
        .join(' ');
};

export const toCelsius = (temp: number) => Math.round(temp - 273.15);//Math.round(((temp - 32) * 5) / 9);

export const locationTitle = (coord: Coord) => `Longtitude: ${coord.lon} Latitude: ${coord.lat}`