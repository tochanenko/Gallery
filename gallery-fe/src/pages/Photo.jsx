import { Suspense, useState } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import { API_URL, PHOTO_URL } from "../utils/constants";

import classes from "./Photo.module.scss";

export default function PhotoPage() {
  const [ hoveredIndex, setHoveredIndex ] = useState(null);
  const { photo } = useRouteLoaderData('photo');

  function formatDate(date) {
    const formattedDate = Date.parse(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(formattedDate);
  }

  return <>
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={photo}>
        {(resolvedPhoto) => (
          <>
            <div className={classes.photo_block}>
              <img src={`${PHOTO_URL}${resolvedPhoto.url}`} />
            </div>

            <div className="container">
              <div className={classes.photo_info}>
                <h2 className={classes.title}>{resolvedPhoto.title}</h2>
                <div>
                  <span className={classes.rating}>
                    {[0, 1, 2, 3, 4].map((circle => (
                      <svg
                        key={circle}
                        className={(hoveredIndex !== null) && (hoveredIndex >= circle) ? classes.hovered : ''}
                        onMouseEnter={() => setHoveredIndex(circle)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 24 24"
                      >
                        <path className={classes.st0} d="M12,22.5c-5.79,0-10.5-4.71-10.5-10.5S6.21,1.5,12,1.5s10.5,4.71,10.5,10.5-4.71,10.5-10.5,10.5Z" />
                        <path className={classes.st1} d="M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9S3,16.96,3,12,7.04,3,12,3M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0h0Z" />
                      </svg>
                    )))}
                  </span>
                  <span className={classes.date}>{formatDate(resolvedPhoto.date)}</span>
                </div>
                <p>{resolvedPhoto.description}</p>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
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