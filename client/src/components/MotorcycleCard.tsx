import { getSpecs, getTypeIcon } from '../utils/motorcycleDetails';
import type { Motorcycle } from '../utils/types';

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
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
    </article>
  );
}

export default MotorcycleCard;
