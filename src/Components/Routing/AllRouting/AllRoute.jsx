import { createBrowserRouter } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
import Error from "../../Pages/ErrorPage/Error";
import Home from "../../Pages/HomePage/Home";
import WishList from "../../Pages/WishlistPage/WishList";
import BookPage from "../../Pages/BookPage/BookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute></MainRoute>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "/book-details",
        element: <BookPage></BookPage>,
      },
    ],
  },
]);

export default router;
