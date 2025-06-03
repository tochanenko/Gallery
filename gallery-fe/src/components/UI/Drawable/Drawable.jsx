import { motion } from "motion/react";
import { useRef, useState } from "react";

export default function Drawable({ src, alt, predictedDims = { height: "16px", width: "16px" }, className = "", ...props }) {
  const imgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return <>
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setImageLoaded(true)}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      {...props}
    />
    {!imageLoaded && <motion.div
      className={className}
      style={{ height: predictedDims.height, width: predictedDims.width, borderRadius: predictedDims.height, position: "absolute" }}
      initial={{ backgroundColor: "var(--skeleton-background)" }}
      animate={{
        backgroundColor: ["var(--skeleton-background)", "var(--skeleton-background-tinted)", "var(--skeleton-background)"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />}
  </>
}