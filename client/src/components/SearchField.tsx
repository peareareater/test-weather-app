import React, { ChangeEvent, FC, SyntheticEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { searchCity } from '../store/actions/cities';

interface SearchFieldProps {
    searchCity: (city: string) => void;
}

const SearchFieldComponent: FC<SearchFieldProps> = ({ searchCity }) => {
    const [value, setValue] = React.useState('');
    const [typing, setTyping] = React.useState(null);

    useEffect(() => {
        searchCity('new york');
    }, []);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (typing) {
            clearTimeout(typing);
        }
        setValue(value);
        clearTimeout(typing);
        setTyping(
            setTimeout(() => {
                searchCity(value);
            }, 500)
        );
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        clearTimeout(typing);
        searchCity(value);
    };

    return (
        <div className="search-input-container">
            <form onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faChevronRight} onClick={handleSubmit} />
                <input value={value} onChange={onChange} placeholder="Search" />
            </form>
        </div>
    );
};

export const SearchField = connect(null, { searchCity: (city) => searchCity({ city }) })(SearchFieldComponent);
