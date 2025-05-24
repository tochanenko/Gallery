import MainContaner from "./components/MainContainer/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import CategoryPage, { loader as photosByCategoryLoader } from "./pages/Category";
import PhotoPage, { loader as photoByIdLoader } from "./pages/Photo";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContaner />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'category/:categoryName',
        id: 'category-photos',
        element: <CategoryPage />,
        loader: photosByCategoryLoader
      },
      {
        path: 'photo/:photoId',
        id: 'photo',
        element: <PhotoPage />,
        loader: photoByIdLoader
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
