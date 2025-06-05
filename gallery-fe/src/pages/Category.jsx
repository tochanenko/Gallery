import { useLocation, useRouteLoaderData } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid";
import { getPhotosByCategory } from "../lib/http";
import { getCategoryByUrl } from "../lib/utils";

export default function CategoryPage() {
  const { photos } = useRouteLoaderData('category-photos');
  const location = useLocation();

  return <>
    <title>{`VPhotos \u2758 ${getCategoryByUrl(location.pathname)}`}</title>
    <div className="main_container">
      <div className="container">
        <PhotoGrid photos={photos} />
      </div>
    </div>
  </>

}

export async function loader({ request, params }) {
  const categoryName = params.categoryName;

  return {
    photos: getPhotosByCategory(categoryName)
  }
}