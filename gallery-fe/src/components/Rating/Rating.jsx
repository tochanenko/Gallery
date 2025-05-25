import { useState } from "react";
import classes from "./Rating.module.scss";

export default function Rating({ ratings, photoId, handleRating }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function calculateRating(ratings) {
    return ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
  }

  function calculatePercent(ratings, circle) {
    const rating = calculateRating(ratings);
    const diff = circle - rating;
    if (diff <= 0) {
      return 100;
    } else if (diff > 1) {
      return 0;
    } else {
      return 100 - diff * 100;
    }
  }

  function getRatingForUser(ratings) {
    const userId = localStorage.getItem("userUUID");
    const ratingIndex = ratings.findIndex(rating => rating.userId === userId);
    return ratingIndex !== -1 ? ratings[ratingIndex].rating : 0;
  }

  return <>
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
          style={{ background: `linear-gradient(to right, ${getRatingForUser(ratings) >= circle ? 'rgba(255, 165, 255, 1)' : 'rgba(0, 0, 0, 1)'} ${calculatePercent(ratings, circle)}%, ${getRatingForUser(ratings) >= circle ? 'rgba(255, 165, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} ${calculatePercent(ratings, circle)}%` }}
        />
      </div>
    ))}
    <span className={classes.rating_number}>{calculateRating(ratings) ? calculateRating(ratings) : ''}</span>
  </>;
}