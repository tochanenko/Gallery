import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid";
import { getPhotosByCategory } from "../lib/http";

export default function CategoryPage() {
  const { photos } = useRouteLoaderData('category-photos');

  return <>
    <div className="container">
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={photos}>
          {(resolvedPhotos) => <PhotoGrid photos={resolvedPhotos} />}
        </Await>
      </Suspense>
    </div>
  </>
}

export async function loader({ request, params }) {
  const categoryName = params.categoryName;

  return {
    photos: getPhotosByCategory(categoryName)
  }
}