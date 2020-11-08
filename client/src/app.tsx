import {hot} from "react-hot-loader/root";
import React, {useState} from "react";
import {Header} from "./components/Header";
import "./styles/index.scss";
import { SearchResult } from './containers/SearchResult';
import { RecentResults } from './containers/RecentResults';
import { FavouriteCities } from './containers/FavouriteCities';

function App(props) {
    return (
        <>
            <Header/>
            <div className="container">
                <FavouriteCities />
                <RecentResults />
                <SearchResult />
            </div>
        </>
    );
}

export default hot(App);
