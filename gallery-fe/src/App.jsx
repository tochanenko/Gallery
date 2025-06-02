import MainContaner from "./components/MainContainer/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import CategoryPage, { loader as photosByCategoryLoader } from "./pages/Category";
import PhotoPage, { loader as photoByIdLoader } from "./pages/Photo";
import { useDispatch } from "react-redux";
import { useTheme } from "./lib/hooks";
import { API_URL, LOCAL_USER_UUID } from "./lib/constants";
import { userActions } from "./store/user";

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
  const theme = useTheme();
  const dispatch = useDispatch();

  async function authenticate() {
    let userUUID = localStorage.getItem(LOCAL_USER_UUID);

    const response = userUUID
      ? await fetch(`${API_URL}/user/${userUUID}`)
      : await fetch(`${API_URL}/user`, { method: 'POST' });

    if (!response.ok) {
      throw new Response(JSON.stringify({ message: 'Could not get user details' }), { status: 500 });
    } else {
      const resData = await response.json();
      console.log(resData);
      localStorage.setItem(LOCAL_USER_UUID, resData.user.id);
      dispatch(userActions.updateUser(resData.user));
    }
  }

  authenticate();

  return <div className={`main_container ${theme}`}><RouterProvider router={router} /></div>;
}

export default App;

// TODO Add functionality to push comments
// TODO Add separate view for new comment on Desktop
// TODO Add theme to the localStorage
// TODO Move `Photo` component from `PhotosGrid` to separate file in the same folder
// TODO Add Error Pages
// TODO Add skeleton preloading animations