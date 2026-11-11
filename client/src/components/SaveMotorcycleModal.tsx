import { useState } from 'react';
import starEmptyIcon from '../images/star-empty.svg';
import starIcon from '../images/star.svg';
import { GARAGE_STATUS_LABELS, RATING_VALUES, REVIEW_MAX_LENGTH } from '../utils/constants';
import type { GarageStatus, Motorcycle, NewGarageItem } from '../utils/types';
import ModalWithForm from './ModalWithForm';

interface SaveMotorcycleModalProps {
  motorcycle: Motorcycle | null;
  isOpen: boolean;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
  onSave: (item: NewGarageItem) => void;
}

const STATUS_OPTIONS = Object.entries(GARAGE_STATUS_LABELS) as [GarageStatus, string][];

function SaveMotorcycleModal({
  motorcycle,
  isOpen,
  isLoading,
  errorMessage,
  onClose,
  onSave,
}: SaveMotorcycleModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [status, setStatus] = useState<GarageStatus>('want');
  const [review, setReview] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!motorcycle) return;
    onSave({
      make: motorcycle.make,
      model: motorcycle.model,
      year: motorcycle.year,
      rating,
      status,
      review: review.trim(),
    });
  }

  return (
    <ModalWithForm
      title="Guardar en mi garage"
      name="save"
      submitText="Guardar"
      loadingText="Guardando…"
      isOpen={isOpen}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {motorcycle && (
        <p className="save-form__motorcycle">
          {motorcycle.make} {motorcycle.model} · {motorcycle.year}
        </p>
      )}
      <fieldset className="save-form__fieldset">
        <legend className="form-field__label">Tu calificación</legend>
        <div className="save-form__stars">
          {RATING_VALUES.map((value) => (
            <label className="save-form__star" key={value}>
              <input
                className="save-form__star-input"
                type="radio"
                name="rating"
                value={value}
                required
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              <img
                src={value <= rating ? starIcon : starEmptyIcon}
                alt={`${value} de 5`}
                width="32"
                height="32"
              />
            </label>
          ))}
        </div>
      </fieldset>
      <label className="form-field">
        <span className="form-field__label">Estado</span>
        <select
          className="form-field__input"
          name="status"
          required
          value={status}
          onChange={(event) => setStatus(event.target.value as GarageStatus)}
        >
          {STATUS_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span className="form-field__label">
          Reseña breve (opcional, {review.length}/{REVIEW_MAX_LENGTH})
        </span>
        <textarea
          className="form-field__input form-field__input_type_textarea"
          name="review"
          placeholder="¿Qué te gusta de esta moto?"
          maxLength={REVIEW_MAX_LENGTH}
          rows={3}
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default SaveMotorcycleModal;
