export type Coord = { lon: number; lat: number };

type Weather = { description: string; icon: string };
type Wind = { deg: number; speed: number };
type Sys = { country: string };
type Main = {
    feelds_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
};
export type SearchResult = {
    base: string;
    name: string;
    clouds: { all: number };
    coord: Coord;
    sys: Sys;
    weather: Weather[];
    main: Main;
    wind: Wind;
};
export type FavouriteCity = {
    name: string,
    coord: Coord,
    sys: Sys
}