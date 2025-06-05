import { Await, Link, useRouteLoaderData } from "react-router-dom";
import { getRandomPhotos } from "../lib/http";
import { Suspense } from "react";
import { CATEGORIES, PHOTO_URL } from "../lib/constants";

import classes from "./Home.module.scss";
import Skeleton from "../components/UI/Skelelton/Skeleton";

export default function HomePage() {
  const { randomPhotos: randomPhotosPromise } = useRouteLoaderData('random-photos');

  return <>
    <title>VPhotos &#10072; HOME</title>
    <Suspense fallback={[0, 1, 2, 3].map(key => <div key={key} className={classes.home}><Skeleton className={classes.home__photo} /></div>)}>
      <Await resolve={randomPhotosPromise}>
        {(resolvedRandomPhotos) => resolvedRandomPhotos.map(photosFromCategory => (
          <RandomPhotosFromCategory
            key={photosFromCategory.category}
            category={photosFromCategory.category}
            photo={photosFromCategory.photos[0]}
          />
        ))}
      </Await>
    </Suspense>
  </>
}

function RandomPhotosFromCategory({ category, photo }) {
  return <div className={classes.home}>
    <Link to={`category/${category}`}>
      <div className={classes.home__photo}>
        <img src={`${PHOTO_URL}${photo.url}`} alt={photo.title} />
        <h1 className={classes.home__title}>{CATEGORIES.find(c => c.id === category).name}</h1>
      </div>
    </Link>
  </div>
}

export async function loader({ request, params }) {
  return {
    randomPhotos: getRandomPhotos()
  }
}