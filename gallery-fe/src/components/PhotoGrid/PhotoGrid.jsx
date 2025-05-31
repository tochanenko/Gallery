import { useRef, useState } from "react";
import classes from "./PhotoGrid.module.scss";
import { PHOTO_URL } from '../../lib/constants';
import { Link } from "react-router-dom";

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
      <Link to={`/photo/${photo.id}`}>
        <img
          className={loading ? classes.blur : undefined}
          src={`${PHOTO_URL}${photo.url}`}
          alt={photo.title}
          onLoad={handleLoad}
        />
      </Link>
    </div>
  </>;
}