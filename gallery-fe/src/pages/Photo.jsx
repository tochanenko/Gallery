import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { PHOTO_URL } from "../lib/constants";

import classes from "./Photo.module.scss";
import Rating from "../components/Rating/Rating";
import Comment from "../components/Comment/Comment";

import { formatDate } from "../lib/utils";
import NewComment from "../components/NewComment/NewComment";
import Card from "../components/UI/Card/Card";
import { useSelector } from "react-redux";
import PhotoPreview from "../components/PhotoPreview/PhotoPreview";
import { motion } from "motion/react";
import { getPhotoById, putNewRating, putPhotoDetails } from "../lib/http";

export default function PhotoPage() {
  const [photo, setPhoto] = useState(null);
  const { photo: photoPromise } = useRouteLoaderData('photo');
  const userId = useSelector(state => state.user.id);
  const [photoPreview, setPhotoPreview] = useState(false);

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

    try {
      await putNewRating(photo.id, userId, newRating);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePhotoDetails(formData) {
    const title = formData.get('title');
    const description = formData.get('description');

    try {
      await putPhotoDetails(photo.id, title, description);
      setPhoto(prevPhoto => ({ ...prevPhoto, title, description }));
    } catch (e) {
      console.log(e);
    }
  }

  return <>
    <div className="container">
      <PhotoPreview visible={photoPreview} photo={photo} onClose={() => setPhotoPreview(false)} />

      <motion.div layout>
        <Card
          className={classes.photo_block}
          animateAppearance
        >
          {!photo ? <motion.div
            className={classes["photo_block--skeleton"]}
            initial={{ backgroundColor: "var(--photo-skeleton-background)" }}
            animate={{
              backgroundColor: ["var(--photo-skeleton-background)", "var(--photo-skeleton-background-tinted)", "var(--photo-skeleton-background)"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          /> : <motion.img
            src={`${PHOTO_URL}${photo.url}`}
            alt={photo.title}
            onClick={() => setPhotoPreview(true)}
            layoutId={`photo-${photo.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />}
        </Card>
      </motion.div>

      <Card
        className={classes.photo_info}
        animateAppearance
      >
        {!photo ? <motion.div
          className={classes["photo_info--skeleton"]}
          initial={{ backgroundColor: "var(--skeleton-background)" }}
          animate={{
            backgroundColor: ["var(--skeleton-background)", "var(--skeleton-background-tinted)", "var(--skeleton-background)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        /> : <div className={classes.block}>
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
        </div>}
      </Card>
      {photo && photo.comments ? photo.comments.map(comment => <Comment
        key={comment.id}
        comment={comment}
        animateAppearance
      />) : undefined}
      <NewComment photo={photo} />
    </div>
  </>
}

export async function loader({ request, params }) {
  const photoId = params.photoId;

  return {
    photo: getPhotoById(photoId)
  }
}
