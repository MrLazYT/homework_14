import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, removePost } from "./postsSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function EditPost() {
    const params = useParams();
    const id = params.id;
    const posts = useSelector((state) => state.posts.posts);
    const [post, setPost] = useState(posts.find((post) => post.id === +id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(removePost(+id));
        dispatch(editPost(post));
        navigate("/");
    };

    const onTitleChangeHandler = (e) => {
        setPost({
            ...post,
            title: e.target.value,
        });
    };

    const onBodyChangeHandler = (e) => {
        setPost({
            ...post,
            body: e.target.value,
        });
    };

    const onAuthorChangeHandler = (e) => {
        setPost({
            ...post,
            author: e.target.value,
        });
    };

    return (
        <Box>
            <Typography variant="h4">Editing Post</Typography>

            <form onSubmit={submitHandler}>
                <Box className="textfield-container">
                    <TextField
                        fullWidth
                        id="title-input"
                        label="Title"
                        variant="outlined"
                        value={post.title}
                        onChange={onTitleChangeHandler}
                    />
                </Box>

                <Box className="textfield-container">
                    <TextField
                        fullWidth
                        id="content-input"
                        label="Content"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={post.body}
                        onChange={onBodyChangeHandler}
                    />
                </Box>

                <Box className="textfield-container">
                    <TextField
                        fullWidth
                        id="author-input"
                        label="Author"
                        variant="outlined"
                        value={post.author}
                        onChange={onAuthorChangeHandler}
                    />
                </Box>

                <Box className="button-container">
                    <Button variant="contained" type="submit">
                        Save Changes
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
