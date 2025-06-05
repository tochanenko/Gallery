import classes from "./PhotoGrid.module.scss";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import Skeleton from "../UI/Skelelton/Skeleton";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Photo from "./Photo";

export default function PhotoGrid({ photos }) {
  return <>
    <Suspense fallback={<PhotoGridSkeleton />}>
      <Await resolve={photos}>
        {(resolvedPhotos) => resolvedPhotos ? <div className={classes.photo_grid}>
          {resolvedPhotos.map(photo => <Photo key={photo.id} photo={photo} />)}
        </div> : <ErrorComponent />}
      </Await>
    </Suspense>
  </>
}

function PhotoGridSkeleton() {
  return <div className={classes.photo_grid}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(key => <Skeleton key={key} className={classes['photo--skeleton']} />)}
  </div>
}