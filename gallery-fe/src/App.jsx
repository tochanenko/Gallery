import MainContaner from "./components/MainContainer/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 } from "uuid";

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

  function generateUserToken() {
    let userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
      userUUID = v4();
      localStorage.setItem("userUUID", userUUID);
    }
  }

  generateUserToken();

  return <RouterProvider router={router} />;
}

export default App;
