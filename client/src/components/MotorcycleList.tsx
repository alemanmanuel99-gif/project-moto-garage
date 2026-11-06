import { getMotorcycleKey } from '../utils/motorcyclesApi';
import type { Motorcycle } from '../utils/types';
import MotorcycleCard from './MotorcycleCard';

interface MotorcycleListProps {
  motorcycles: Motorcycle[];
  visibleCount: number;
  onShowMore: () => void;
}

function MotorcycleList({ motorcycles, visibleCount, onShowMore }: MotorcycleListProps) {
  const visibleMotorcycles = motorcycles.slice(0, visibleCount);
  const hasMore = visibleCount < motorcycles.length;

  return (
    <>
      <ul className="motorcycle-list">
        {visibleMotorcycles.map((motorcycle) => (
          <li className="motorcycle-list__item" key={getMotorcycleKey(motorcycle)}>
            <MotorcycleCard motorcycle={motorcycle} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          className="button button_type_secondary motorcycle-list__more"
          type="button"
          onClick={onShowMore}
        >
          Mostrar más
        </button>
      )}
    </>
  );
}

export default MotorcycleList;
