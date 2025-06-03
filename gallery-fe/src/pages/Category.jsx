import { useRouteLoaderData } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid";
import { getPhotosByCategory } from "../lib/http";

export default function CategoryPage() {
  const { photos } = useRouteLoaderData('category-photos');

  return <div className="main_container">
    <div className="container">
      <PhotoGrid photos={photos} />
    </div>
  </div>
}

export async function loader({ request, params }) {
  const categoryName = params.categoryName;

  return {
    photos: getPhotosByCategory(categoryName)
  }
}