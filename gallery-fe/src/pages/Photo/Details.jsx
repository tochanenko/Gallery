import { useSelector } from "react-redux";
import Rating from "../../components/Rating/Rating";
import Card from "../../components/UI/Card/Card";
import Skeleton from "../../components/UI/Skelelton/Skeleton";
import { formatDate } from "../../lib/utils";

import classes from "./Photo.module.scss";
import { putNewRating } from "../../lib/http";

export default function Details({ photo, onSetPhoto }) {
  const userId = useSelector(state => state.user.id);

  async function handleRating(newRating) {
    try {
      const updatedRating = await putNewRating(photo.id, userId, newRating);
      if (updatedRating) {
        onSetPhoto(prev => {
          if (!prev.ratings) {
            return { ...prev, ratings: [newRating] };
          }

          const existingIndex = prev.ratings.findIndex(rating => rating.userId === userId);
          let updatedRatings;

          if (existingIndex !== -1) {
            updatedRatings = [...prev.ratings];
            updatedRatings[existingIndex] = { userId, rating: newRating };
          } else {
            updatedRatings = [...prev.ratings, { userId, rating: newRating }];
          }

          return { ...prev, ratings: updatedRatings };
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <>
    <Card
      className={classes.photo_info}
      animateAppearance
    >
      {photo === null || undefined ? <Skeleton className={classes["photo_info--skeleton"]} /> : <div className={classes.block}>
        <h2 className={classes.title}>{photo.title || 'Single photo worth 1000 words'}</h2>
        <div className={classes.details}>
          <Rating className={classes.ratings} ratings={photo.ratings} handleRating={handleRating} photoId={photo.id} />
          <span className={classes.date}>{formatDate(photo.date)}</span>
        </div>

        <p>{photo.description || 'You don\'t need to say anything. Just observe...'}</p>
      </div>}
    </Card>
  </>
}