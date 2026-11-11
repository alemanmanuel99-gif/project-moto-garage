import { useContext, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {
  CARDS_PER_PAGE,
  IDLE_MESSAGE,
  NOT_FOUND_MESSAGE,
  SEARCH_ERROR_TITLE,
  SEARCH_FIELD_LABELS,
} from '../utils/constants';
import { searchMotorcycles } from '../utils/motorcyclesApi';
import type { Motorcycle, SearchParams, SearchStatus } from '../utils/types';
import MotorcycleList from './MotorcycleList';
import Preloader from './Preloader';
import SearchForm from './SearchForm';
import StatusMessage from './StatusMessage';

interface MainProps {
  savedKeys: Set<string>;
  onSaveClick: (motorcycle: Motorcycle) => void;
}

function Main({ savedKeys, onSaveClick }: MainProps) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(CARDS_PER_PAGE);
  const [lastSearch, setLastSearch] = useState<SearchParams | null>(null);

  async function handleSearch(params: SearchParams) {
    setStatus('loading');
    setLastSearch(params);
    setVisibleCount(CARDS_PER_PAGE);
    try {
      const results = await searchMotorcycles(params);
      setMotorcycles(results);
      setStatus('success');
    } catch (error) {
      setMotorcycles([]);
      setErrorMessage(error instanceof Error ? error.message : '');
      setStatus('error');
    }
  }

  function handleShowMore() {
    setVisibleCount((count) => count + CARDS_PER_PAGE);
  }

  function renderResults() {
    if (status === 'loading') {
      return <Preloader />;
    }
    if (status === 'error') {
      return <StatusMessage title={SEARCH_ERROR_TITLE} text={errorMessage} isError />;
    }
    if (status === 'success' && motorcycles.length === 0) {
      return <StatusMessage title={NOT_FOUND_MESSAGE.TITLE} text={NOT_FOUND_MESSAGE.TEXT} />;
    }
    if (status === 'success' && lastSearch) {
      return (
        <>
          <h2 className="results__title">
            {motorcycles.length} {motorcycles.length === 1 ? 'resultado' : 'resultados'} para{' '}
            {SEARCH_FIELD_LABELS[lastSearch.field].toLowerCase()} «{lastSearch.query.trim()}»
          </h2>
          <MotorcycleList
            motorcycles={motorcycles}
            visibleCount={visibleCount}
            isLoggedIn={isLoggedIn}
            savedKeys={savedKeys}
            onShowMore={handleShowMore}
            onSaveClick={onSaveClick}
          />
        </>
      );
    }
    return <StatusMessage title={IDLE_MESSAGE.TITLE} text={IDLE_MESSAGE.TEXT} />;
  }

  return (
    <main className="content">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">Encuentra la ficha técnica de tu próxima moto</h1>
          <p className="hero__subtitle">
            Busca por marca o modelo y compara motor, potencia, peso y más en un solo lugar.
          </p>
          <SearchForm isLoading={status === 'loading'} onSearch={handleSearch} />
        </div>
      </section>
      <section className="results" aria-live="polite">
        <div className="results__container">{renderResults()}</div>
      </section>
    </main>
  );
}

export default Main;
