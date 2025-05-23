import { Suspense } from "react";
import { Await, useParams, useRouteLoaderData } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid";

export default function CategoryPage() {
  const params = useParams();
  const { photos } = useRouteLoaderData('category-photos');

  return <>
    <div className="container">
      <h1>"{params.categoryName}" Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={photos}>
          {(resolvedPhotos) => <PhotoGrid photos={resolvedPhotos} />}
        </Await>
      </Suspense>
    </div>
  </>
}

async function loadPhotosByCategory(categoryName) {
  const response = await fetch(`http://localhost:3001/photos/${categoryName}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cound not fetch photos' }, { status: 500 }));
  } else {
    const resData = await response.json();
    return resData.photos;
  }
}

export async function loader({ request, params }) {
  const categoryName = params.categoryName;

  return {
    photos: loadPhotosByCategory(categoryName)
  }
}