import defaultIcon from '../images/moto-default.svg';
import { GARAGE_STATUS_LABELS } from '../utils/constants';
import type { GarageItem } from '../utils/types';
import RatingStars from './RatingStars';

interface GarageCardProps {
  item: GarageItem;
  isDeleting: boolean;
  onDelete: (item: GarageItem) => void;
}

function GarageCard({ item, isDeleting, onDelete }: GarageCardProps) {
  return (
    <article className="garage-card">
      <div className="garage-card__header">
        <img className="garage-card__icon" src={defaultIcon} alt="Ícono de motocicleta" width="56" height="56" />
        <div>
          <p className="garage-card__meta">{item.year}</p>
          <h3 className="garage-card__title">
            {item.make} {item.model}
          </h3>
        </div>
      </div>
      <div className="garage-card__details">
        <span className={`garage-card__status garage-card__status_type_${item.status}`}>
          {GARAGE_STATUS_LABELS[item.status]}
        </span>
        <RatingStars rating={item.rating} />
      </div>
      {item.review ? (
        <p className="garage-card__review">«{item.review}»</p>
      ) : (
        <p className="garage-card__review garage-card__review_empty">Sin reseña.</p>
      )}
      <button
        className="button button_type_danger garage-card__delete"
        type="button"
        disabled={isDeleting}
        onClick={() => onDelete(item)}
      >
        {isDeleting ? 'Eliminando…' : 'Eliminar del garage'}
      </button>
    </article>
  );
}

export default GarageCard;
