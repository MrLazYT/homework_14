import { Routes, Route } from "react-router-dom";
import "./App.css";
import Posts from "./features/posts/Posts";
import PostPage from "./features/posts/PostPage";
import AddPost from "./features/posts/AddPost";
import EditPost from "./features/posts/EditPost";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    
    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);
    const error = useSelector((state) => state.posts.error);

    if (isLoading) {
        return "Loading...";
    }

    if (error) {
        return error;
    }

    return (
        <Box className="App">
            <Routes>
                <Route path="/" element={<Posts posts = {posts}/>} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/post/:id/edit/" element={<EditPost />} />
                <Route path="/add-post" element={<AddPost />} />
            </Routes>
        </Box>
    );
}

export default App;
