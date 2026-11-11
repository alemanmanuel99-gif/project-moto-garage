import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { GARAGE_MESSAGES } from '../utils/constants';
import type { GarageItem } from '../utils/types';
import GarageCard from './GarageCard';
import Preloader from './Preloader';
import StatusMessage from './StatusMessage';

function getCountText(count: number): string {
  return count === 1 ? 'tienes 1 moto guardada' : `tienes ${count} motos guardadas`;
}

interface GarageProps {
  items: GarageItem[];
  isLoading: boolean;
  deletingId: string | null;
  onDelete: (item: GarageItem) => void;
}

function Garage({ items, isLoading, deletingId, onDelete }: GarageProps) {
  const { currentUser } = useContext(CurrentUserContext);

  function renderContent() {
    if (isLoading) {
      return <Preloader text={GARAGE_MESSAGES.LOADING} />;
    }
    if (items.length === 0) {
      return (
        <>
          <StatusMessage title={GARAGE_MESSAGES.EMPTY_TITLE} text={GARAGE_MESSAGES.EMPTY_TEXT} />
          <Link className="button garage__search-link" to="/">
            Buscar motos
          </Link>
        </>
      );
    }
    return (
      <ul className="garage__list">
        {items.map((item) => (
          <li className="garage__item" key={item._id}>
            <GarageCard item={item} isDeleting={deletingId === item._id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="content">
      <section className="garage">
        <div className="garage__container">
          <h1 className="garage__title">Mi garage</h1>
          {!isLoading && (
            <p className="garage__subtitle">
              {currentUser?.name}, {getCountText(items.length)}.
            </p>
          )}
          {renderContent()}
        </div>
      </section>
    </main>
  );
}

export default Garage;
