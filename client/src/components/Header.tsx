import React, { FC } from 'react';
import { SearchField } from './SearchField';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
    return (
        <div className="header">
            <div className="header-sector">Favourites</div>
            <div className="header-sector">Recent Searches</div>
            <div className="header-sector">
                <SearchField />
            </div>
        </div>
    );
};
