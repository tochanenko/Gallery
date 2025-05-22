import Header from "./components/UI/Header/Header";
import MainContaner from "./components/UI/MainContainer/MainContainer";
import Footer from "./components/UI/Footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContaner />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'category/:categoryName',
        element: <CategoryPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
