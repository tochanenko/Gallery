import { Suspense } from "react";
import { Await, useParams, useRouteLoaderData } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid";
import { API_URL } from "../lib/constants";

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

async function loadPhotosByCategory(categoryName) {
  const response = await fetch(`${API_URL}/photos/${categoryName}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cound not fetch photos' }), { status: 500 });
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