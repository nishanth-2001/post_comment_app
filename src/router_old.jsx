import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from "./screens/home";
import PostPage from "./screens/posts"
import UsersPage from "./screens/users";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <PostPage />,
  },
  {
    path: "/users"
    element: <UsersPage/>,
  }

]);


const Router = () => {
  return (
    <RouterProvider router={router} />
   
  )
}


export default Router