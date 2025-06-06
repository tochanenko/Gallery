import { useState } from "react";
import Card from "../../components/UI/Card/Card";
import Skeleton from "../../components/UI/Skelelton/Skeleton";
import { PHOTO_URL } from "../../lib/constants";
import classes from "./Photo.module.scss";
import { motion } from "motion/react";

export default function PhotoBlock({ photo, onSetPhotoPreview }) {
  const [overflowVisible, setOverflowVisible] = useState(false);

  function handleOpenPreview() {
    setOverflowVisible(true);
    onSetPhotoPreview(true)
  }

  return <div>
    <Card
      className={classes.photo_block}
      animateAppearance
    >
      {photo === null ? <Skeleton
        className={classes["photo_block--skeleton"]}
        initialBackground="var(--photo-skeleton-background)"
        tintedBackground="var(--photo-skeleton-background-tinted)"
      /> : <div
        className={classes.photo_block__image}
      >
        <img
          src={`${PHOTO_URL}${photo.url}`}
          alt={photo.title}
          onClick={handleOpenPreview}
        />
      </div>}
    </Card>
  </div>
}