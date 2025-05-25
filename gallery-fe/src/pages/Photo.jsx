import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { API_URL, PHOTO_URL } from "../utils/constants";

import classes from "./Photo.module.scss";

export default function PhotoPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { photo: photoPromise } = useRouteLoaderData('photo');

  useEffect(() => {
    photoPromise.then(setPhoto);
  }, [photoPromise]);

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

  function formatDate(date) {
    const formattedDate = Date.parse(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(formattedDate);
  }

  async function handleRating(newRating) {
    const userId = localStorage.getItem("userUUID");

    setPhoto(prev => {
      const existingIndex = prev.ratings.findIndex(rating => rating.userId === userId);
      let updatedRatings;

      if (existingIndex !== -1) {
        updatedRatings = [...prev.ratings];
        updatedRatings[existingIndex] = { userId, rating: newRating };
      } else {
        updatedRatings = [...prev.ratings, { userId, rating: newRating }];
      }

      console.log(JSON.stringify({ ...prev, ratings: updatedRatings }, null, 4));

      return { ...prev, ratings: updatedRatings };
    });

    const response = await fetch(`${API_URL}/rating/${photo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, rating: newRating }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not update rating' }), { status: 500 });
    }
  }

  if (!photo) {
    return <p>Loading...</p>;
  }

  return <>
    <div className={classes.photo_block}>
      <img src={`${PHOTO_URL}${photo.url}`} />
    </div>

    <div className="container">
      <div className={classes.photo_info}>
        <h2 className={classes.title}>{photo.title}</h2>
        <div className={classes.details}>
          {[1, 2, 3, 4, 5].map(circle => (
            <div
              key={circle}
              className={`${classes.rating} ${(hoveredIndex !== null) && (hoveredIndex >= circle) ? classes.hovered : ''}`}
              onMouseEnter={() => setHoveredIndex(circle)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleRating(circle, photo.id)}
            >
              <div
                className={classes.rating_circle}
                style={{ background: `linear-gradient(to right, ${getRatingForUser(photo.ratings) >= circle ? 'rgba(255, 165, 255, 1)' : 'rgba(0, 0, 0, 1)'} ${calculatePercent(photo.ratings, circle)}%, ${getRatingForUser(photo.ratings) >= circle ? 'rgba(255, 165, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} ${calculatePercent(photo.ratings, circle)}%` }}
              />
            </div>
          ))}
          <span>{calculateRating(photo.ratings) ? calculateRating(photo.ratings) : ''}</span>
          <span className={classes.date}>{formatDate(photo.date)}</span>
        </div>
        <p>{photo.description}</p>
      </div>
    </div>
  </>
}

async function loadPhotoById(photoId) {
  const response = await fetch(`${API_URL}/photo/${photoId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cound not fetch photo' }, { status: 500 }));
  } else {
    const resData = await response.json();
    return resData.photo;
  }
}

export async function loader({ request, params }) {
  const photoId = params.photoId;

  return {
    photo: loadPhotoById(photoId)
  }
}
