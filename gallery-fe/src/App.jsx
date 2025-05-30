import MainContaner from "./components/MainContainer/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 } from "uuid";

import HomePage from "./pages/Home";
import CategoryPage, { loader as photosByCategoryLoader } from "./pages/Category";
import PhotoPage, { loader as photoByIdLoader } from "./pages/Photo";
import { useSelector } from "react-redux";

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
  const theme = useSelector(state => state.theme.theme);

  function generateUserToken() {
    let userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
      userUUID = v4();
      localStorage.setItem("userUUID", userUUID);
    }
  }

  generateUserToken();

  return <div className={`main_container ${theme}`}><RouterProvider router={router} /></div>;
}

export default App;

// TODO Add /UI/Card component
// TODO Make theme as a dropdown select
// TODO Add functionality to push comments
// TODO Add separate view for new comment on Desktop
// TODO Move User Data to Redux Store, keep only User UUID in the local storage
// TODO Add theme to the localStorage
// TODO Add theme toggle that depends on the browser theme