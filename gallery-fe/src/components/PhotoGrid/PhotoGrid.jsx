import classes from "./PhotoGrid.module.scss";
import { PHOTO_URL } from '../../lib/constants';
import { Await, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";

export default function PhotoGrid({ photos }) {
  return <>

    <Suspense fallback={<PhotoGridSkeleton />}>
      <Await resolve={photos}>
        {(resolvedPhotos) => <div className={classes.photo_grid}>
          {resolvedPhotos.map(photo => <Photo key={photo.id} photo={photo} />)}
        </div>}
      </Await>
    </Suspense>
  </>
}

function PhotoGridSkeleton() {
  return <div className={classes.photo_grid}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(key => <motion.div
      key={key}
      className={classes['photo--skeleton']}
      initial={{ backgroundColor: "var(--skeleton-background)" }}
      animate={{
        backgroundColor: ["var(--skeleton-background)", "var(--skeleton-background-tinted)", "var(--skeleton-background)"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />)}
  </div>
}

function Photo({ photo }) {
  const [isObserved, setIsObserved] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entity]) => {
      if (entity.isIntersecting && !isObserved)
        setIsObserved(true);
    }, { threshold: [0.25] });

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