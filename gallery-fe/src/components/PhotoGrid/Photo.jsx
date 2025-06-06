import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import classes from "./PhotoGrid.module.scss";
import { PHOTO_URL } from "../../lib/constants";
import { Link } from "react-router-dom";

export default function Photo({ photo }) {
  const [isObserved, setIsObserved] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entity]) => {
      if (entity.isIntersecting && !isObserved)
        setIsObserved(true);
    }, { threshold: [0.15] });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [isObserved]);

  return <>
    <motion.div
      className={classes.photo}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isObserved ? { opacity: 1, scale: 1 } : false}
      transition={{ delay: 0, duration: 0.3, ease: 'easeOut' }}
      ref={imgRef}
    >
      <Link to={`/photo/${photo.id}`}>
        <img
          src={`${PHOTO_URL}${photo.url}`}
          alt={photo.title}
        />
        <div className={classes.photo__details}>
          <span>{photo.title !== "" ? photo.title : 'Single photo worth 1000 words'}</span>
        </div>
      </Link>
    </motion.div>
  </>;
}