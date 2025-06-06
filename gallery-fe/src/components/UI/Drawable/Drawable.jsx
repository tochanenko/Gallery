import { motion } from "motion/react";
import { useRef, useState } from "react";
import Skeleton from "../Skelelton/Skeleton";

import classes from "./Drawable.module.scss";

export default function Drawable({ src, alt, predictedDims = { height: "16px", width: "16px" }, className = "", ...props }) {
  const imgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return <>
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setImageLoaded(true)}
      className={`${className} ${imageLoaded ? classes.visible : classes.hidden}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      {...props}
    />
    {!imageLoaded && <Skeleton
      className={`${className} ${imageLoaded ? classes.hidden : classes.visible}`}
      style={{ height: predictedDims.height, width: predictedDims.width, borderRadius: predictedDims.height }}
    />}
  </>
}