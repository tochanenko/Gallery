import { useState } from "react";
import classes from "./Rating.module.scss";
import { useSelector } from "react-redux";

export default function Rating({ ratings, photoId, handleRating, className="" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const rating = calculateRating(ratings);
  const ratingsCount = ratings.length;
  const userId = useSelector(state => state.user.id);

  function calculateRating(ratings) {
    return ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
  }

  function calculatePercent(ratings, circle) {
    const rating = calculateRating(ratings);
    const diff = circle - rating;
    if (diff <= 0) {
      return 100;
    } else if (!diff || diff > 1) {
      return 0;
    } else {
      return 100 - diff * 100;
    }
  }

  function getRatingForUser(ratings) {
    const ratingIndex = ratings.findIndex(rating => rating.userId === userId);
    return ratingIndex !== -1 ? ratings[ratingIndex].rating : 0;
  }

  function formatNumber(num) {
    return Number.isInteger(num) ? num : Number(num.toFixed(2));
  }

  return <div className={className}>
    {[1, 2, 3, 4, 5].map(circle => (
      <div
        key={circle}
        className={`${classes.rating} ${(hoveredIndex !== null) && (hoveredIndex >= circle) ? classes.hovered : ''}`}
        onMouseEnter={() => setHoveredIndex(circle)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => handleRating(circle, photoId)}
      >
        <div
          className={classes.rating_circle}
          style={{ background: `linear-gradient(to right, ${getRatingForUser(ratings) >= circle ? 'var(--circle-filled)' : 'var(--circle-average)'} ${calculatePercent(ratings, circle)}%, ${getRatingForUser(ratings) >= circle ? 'var(--circle-half-filled)' : 'var(--circle-half-average)'} ${calculatePercent(ratings, circle)}%` }}
        />
      </div>
    ))}
    <span className={classes.rating_number}>{rating ? formatNumber(rating) : ''} ({ratingsCount} vote{ratingsCount % 10 === 1 ? '' : 's'})</span>
  </div>;
}