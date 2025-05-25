import { Suspense, useEffect, useState } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
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

  function formatDate(date) {
    const formattedDate = Date.parse(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(formattedDate);
  }

  async function handleRating2(newRating) {
    const userId = localStorage.getItem("userUUID");
    const response = await fetch(`${API_URL}/rating/${photo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, rating: newRating }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Cound not update rating' }, { status: 500 }));
    } else {
      // TODO: Add Optimistic update of ratings array of "photo" object. If the rating with the same userID is in photos.ratings, then replace it with new. If no object with selected userId, put new in photos.ratings
    }
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
          <span className={classes.rating}>
            {[0, 1, 2, 3, 4].map((circle => (
              <svg
                key={circle}
                className={`${calculateRating(photo.ratings) >= circle + 1 ? classes.filled : ''} ${(hoveredIndex !== null) && (hoveredIndex >= circle) ? classes.hovered : ''}`}
                onMouseEnter={() => setHoveredIndex(circle)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleRating(circle + 1, photo.id)}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 24 24"
              >
                <path className={classes.st0} d="M12,22.5c-5.79,0-10.5-4.71-10.5-10.5S6.21,1.5,12,1.5s10.5,4.71,10.5,10.5-4.71,10.5-10.5,10.5Z" />
                <path className={classes.st1} d="M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9S3,16.96,3,12,7.04,3,12,3M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0h0Z" />
              </svg>
            )))}
          </span>
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