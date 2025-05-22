import { useLocation, useParams, useRouteLoaderData } from "react-router-dom";

export default function CategoryPage() {
  const params = useParams();

  return <>
    <div className="container">
      <h1>"{params.categoryName}" Category Page</h1>
    </div>
  </>
}