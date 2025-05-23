import { useRef, useState } from "react";
import classes from "./PhotoGrid.module.css";

export default function PhotoGrid({ photos }) {
  return <>
    <div className="container">
      <div className={classes.photo_grid}>
        {photos.map(photo => <Photo key={photo.id} photo={photo} />)}
      </div>
    </div>
  </>
}

function Photo({ photo }) {
  const [loading, setLoading] = useState(true);

  function handleLoad() {
    setLoading(false);
  }

  return <>
    <div className={classes.photo}>
      <img
        className={loading ? classes.blur : undefined}
        src={`http://materials.tochanenko.com/gallery_photos${photo.url}`}
        alt={photo.title}
        onLoad={handleLoad}
      />
    </div>
  </>;
}