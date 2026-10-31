import { useState } from 'react';
import searchIcon from '../images/search.svg';
import { SEARCH_FIELD_LABELS, SEARCH_PLACEHOLDERS } from '../utils/constants';
import type { SearchField, SearchParams } from '../utils/types';

interface SearchFormProps {
  isLoading: boolean;
  onSearch: (params: SearchParams) => void;
}

function SearchForm({ isLoading, onSearch }: SearchFormProps) {
  const [field, setField] = useState<SearchField>('make');
  const [query, setQuery] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ field, query });
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <label className="search-form__label search-form__label_type_select">
        <span className="search-form__label-text">Buscar por</span>
        <select
          className="search-form__select"
          value={field}
          onChange={(event) => setField(event.target.value as SearchField)}
        >
          <option value="make">{SEARCH_FIELD_LABELS.make}</option>
          <option value="model">{SEARCH_FIELD_LABELS.model}</option>
        </select>
      </label>
      <label className="search-form__label search-form__label_type_input">
        <span className="search-form__label-text">{SEARCH_FIELD_LABELS[field]}</span>
        <input
          className="search-form__input"
          type="text"
          name="query"
          placeholder={SEARCH_PLACEHOLDERS[field]}
          minLength={2}
          required
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <button className="button search-form__button" type="submit" disabled={isLoading}>
        <img className="search-form__button-icon" src={searchIcon} alt="" width="20" height="20" />
        {isLoading ? 'Buscando…' : 'Buscar'}
      </button>
    </form>
  );
}

export default SearchForm;
