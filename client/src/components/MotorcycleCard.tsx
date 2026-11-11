import { getSpecs, getTypeIcon } from '../utils/motorcycleDetails';
import type { Motorcycle } from '../utils/types';

function getSaveButtonText(isLoggedIn: boolean, isSaved: boolean): string {
  if (isSaved) return 'En tu garage ✓';
  if (isLoggedIn) return 'Guardar en mi garage';
  return 'Inicia sesión para guardar';
}

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
  isLoggedIn: boolean;
  isSaved: boolean;
  onSaveClick: (motorcycle: Motorcycle) => void;
}

function MotorcycleCard({ motorcycle, isLoggedIn, isSaved, onSaveClick }: MotorcycleCardProps) {
  const specs = getSpecs(motorcycle);
  const type = motorcycle.type ?? 'Sin categoría';

  return (
    <article className="motorcycle-card">
      <div className="motorcycle-card__header">
        <img
          className="motorcycle-card__icon"
          src={getTypeIcon(motorcycle.type)}
          alt={`Ícono de moto tipo ${type}`}
          width="56"
          height="56"
        />
        <div>
          <p className="motorcycle-card__meta">
            {motorcycle.year} · {type}
          </p>
          <h3 className="motorcycle-card__title">
            {motorcycle.make} {motorcycle.model}
          </h3>
        </div>
      </div>
      {specs.length > 0 ? (
        <dl className="motorcycle-card__specs">
          {specs.map((spec) => (
            <div className="motorcycle-card__spec" key={spec.label}>
              <dt className="motorcycle-card__spec-label">{spec.label}</dt>
              <dd className="motorcycle-card__spec-value">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="motorcycle-card__empty">Sin ficha técnica disponible para este modelo.</p>
      )}
      <button
        className="button button_type_secondary motorcycle-card__save"
        type="button"
        disabled={isSaved}
        onClick={() => onSaveClick(motorcycle)}
      >
        {getSaveButtonText(isLoggedIn, isSaved)}
      </button>
    </article>
  );
}

export default MotorcycleCard;
