import starEmptyIcon from '../images/star-empty.svg';
import starIcon from '../images/star.svg';
import { RATING_VALUES } from '../utils/constants';

interface RatingStarsProps {
  rating: number;
}

function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="rating-stars" role="img" aria-label={`Calificación: ${rating} de 5`}>
      {RATING_VALUES.map((value) => (
        <img
          key={value}
          className="rating-stars__star"
          src={value <= rating ? starIcon : starEmptyIcon}
          alt=""
          width="20"
          height="20"
        />
      ))}
    </div>
  );
}

export default RatingStars;
