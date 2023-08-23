import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./screens/home"
import PostPage from "./screens/posts"
import UsersPage from "./screens/users"
import Navbar from "./components/navbar"
import NewPostPage from "./screens/newPost"

const Router = () => {
    return (
        <BrowserRouter>
         <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts/new" element={<NewPostPage/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default Router