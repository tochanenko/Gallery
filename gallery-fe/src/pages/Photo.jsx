import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { API_URL, PHOTO_URL } from "../lib/constants";

import classes from "./Photo.module.scss";
import Rating from "../components/Rating/Rating";
import Comment from "../components/Comment/Comment";

import { formatDate } from "../lib/utils";
import NewComment from "../components/NewComment/NewComment";
import Card from "../components/UI/Card/Card";
import { useSelector } from "react-redux";

export default function PhotoPage() {
  const [photo, setPhoto] = useState(null);
  const { photo: photoPromise } = useRouteLoaderData('photo');
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    photoPromise.then(setPhoto);
  }, [photoPromise]);

  async function handleRating(newRating) {

    setPhoto(prev => {
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

  async function handleUpdatePhotoDetails(formData) {
    const title = formData.get('title');
    const description = formData.get('description');

    const response = await fetch(`${API_URL}/photo/${photo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not update photo details' }), { status: 500 });
    } else {
      setPhoto(prevPhoto => ({ ...prevPhoto, title, description }));
    }
  }

  if (!photo) {
    return <p>Loading...</p>;
  }

  return <>
    <div className="container">

      <Card className={classes.photo_block}>
        <img src={`${PHOTO_URL}${photo.url}`} alt={photo.title} />
      </Card>

      <Card className={classes.photo_info}>
        
        <h2 className={classes.title}>{photo.title || 'Single photo worth 1000 words'}</h2>
        <div className={classes.details}>
          <Rating ratings={photo.ratings} handleRating={handleRating} photoId={photo.id} />
          <span className={classes.date}> // {formatDate(photo.date)}</span>
        </div>

        {false ? <form action={handleUpdatePhotoDetails}>
          <label htmlFor="title">Title</label><br />
          <input id="title" name="title" defaultValue={photo.title || ''} /><br />
          <label htmlFor="description">Description</label><br />
          <textarea id="description" name="description" defaultValue={photo.description || ''} cols={128} /><br />
          <button type="submit">Submit</button>
        </form> : undefined}

        <p>{photo.description || 'You don\'t need to say anything. Just observe...'}</p>

      </Card>
      {photo.comments ? photo.comments.map(comment => <Comment key={comment.id} comment={comment} />) : undefined}
      <NewComment photo={photo} />
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
