import React, { FC } from 'react';
import '../../styles/searchForm.style.css';

interface SearchFormProps {
    searchText: string;
    onSearchTextChange: (text: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchForm: FC<SearchFormProps> = ({ searchText, onSearchTextChange, onSearchSubmit }) => {
    return (
        <div className="search-form">
            <form onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    id="resource_search"
                    name="title"
                    placeholder="Введите название"
                    value={searchText}
                    onChange={(e) => onSearchTextChange(e.target.value)}
                />
                <input type="submit" className="button" value="Поиск" />
            </form>
        </div>
    );
};

export default SearchForm;