import Card from "../../components/UI/Card/Card";
import Skeleton from "../../components/UI/Skelelton/Skeleton";
import { PHOTO_URL } from "../../lib/constants";
import classes from "./Photo.module.scss";
import { motion } from "motion/react";

export default function PhotoBlock({ photo, onSetPhotoPreview }) {
  return <motion.div layout>
    <Card
      className={classes.photo_block}
      animateAppearance
    >
      {photo === null ? <Skeleton
        className={classes["photo_block--skeleton"]}
        initialBackground="var(--photo-skeleton-background)"
        tintedBackground="var(--photo-skeleton-background-tinted)"
      /> : <motion.img
        src={`${PHOTO_URL}${photo.url}`}
        alt={photo.title}
        onClick={() => onSetPhotoPreview(true)}
        layoutId={`photo-${photo.id}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />}
    </Card>
  </motion.div>
}