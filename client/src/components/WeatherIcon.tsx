import React, { FC } from 'react';

interface WeatherIconProps {
    type: string;
    alt: string;
}
export const WeatherIcon: FC<WeatherIconProps> = ({ type, alt }) => {
    return (
        <div className="weather-icon">
            <img alt={alt} src={`http://openweathermap.org/img/wn/${type}.png`} />
        </div>
    );
};
