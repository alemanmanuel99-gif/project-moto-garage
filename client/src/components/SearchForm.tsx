import { useState } from 'react';
import searchIcon from '../images/search.svg';
import {
  MIN_QUERY_LENGTH,
  SEARCH_FIELD_LABELS,
  SEARCH_PLACEHOLDERS,
  VALIDATION_MESSAGES,
} from '../utils/constants';
import type { SearchField, SearchParams } from '../utils/types';

interface SearchFormProps {
  isLoading: boolean;
  onSearch: (params: SearchParams) => void;
}

function getValidationMessage(query: string): string {
  if (query.length === 0) return VALIDATION_MESSAGES.EMPTY_QUERY;
  if (query.length < MIN_QUERY_LENGTH) return VALIDATION_MESSAGES.SHORT_QUERY;
  return '';
}

function SearchForm({ isLoading, onSearch }: SearchFormProps) {
  const [field, setField] = useState<SearchField>('make');
  const [query, setQuery] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setValidationMessage('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const message = getValidationMessage(trimmedQuery);

    if (message) {
      setValidationMessage(message);
      return;
    }

    setQuery(trimmedQuery);
    onSearch({ field, query: trimmedQuery });
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
          className={`search-form__input${validationMessage ? ' search-form__input_type_error' : ''}`}
          type="text"
          name="query"
          placeholder={SEARCH_PLACEHOLDERS[field]}
          required
          aria-invalid={validationMessage !== ''}
          aria-describedby="search-form-error"
          value={query}
          onChange={handleQueryChange}
        />
        <span className="search-form__error" id="search-form-error" role="alert">
          {validationMessage}
        </span>
      </label>
      <button className="button search-form__button" type="submit" disabled={isLoading}>
        <img className="search-form__button-icon" src={searchIcon} alt="Ícono de búsqueda" width="20" height="20" />
        {isLoading ? 'Buscando…' : 'Buscar'}
      </button>
    </form>
  );
}

export default SearchForm;
