import MainContaner from "./components/MainContainer/MainContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import CategoryPage, { loader as photosByCategoryLoader } from "./pages/Category";
import PhotoPage, { loader as photoByIdLoader } from "./pages/Photo";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "./lib/hooks";
import { LOCAL_USER_UUID } from "./lib/constants";
import { userActions } from "./store/user";
import { authenticateUser } from "./lib/http";

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

  const userId = useSelector(state => state.user.id);

  async function authenticate() {
    console.log('Authentication in progress');
    let userUUID = localStorage.getItem(LOCAL_USER_UUID);

    const user = await authenticateUser(userUUID);

    localStorage.setItem(LOCAL_USER_UUID, user.id);
    dispatch(userActions.updateUser(user));
  }

  if (userId === "") {
    authenticate();
  }

  return <div className={`main_container ${theme}`}><RouterProvider router={router} /></div>;
}

export default App;
