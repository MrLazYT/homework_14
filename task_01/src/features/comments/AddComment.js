import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "./commentsSlice";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField } from "@mui/material";

export default function AddComment() {
    const params = useParams();
    const postId = params.id;
    const [comment, setComment] = useState({
        name: "",
        content: "",
        postId: +postId,
    });

    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(addComment(comment));
    };

    const onNameChangeHandler = (e) => {
        setComment({
            ...comment,
            name: e.target.value,
        });
    };

    const onBodyChangeHandler = (e) => {
        setComment({
            ...comment,
            body: e.target.value,
        });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Typography variant="h6">Leave a comment:</Typography>

            <Box>
                <Box className="textfield-container">
                    <TextField
                        fullWidth
                        className="comment-field"
                        id="username"
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={comment.name}
                        onChange={onNameChangeHandler}
                    />
                </Box>

                <Box className="textfield-container">
                    <TextField
                        fullWidth
                        className="comment-field"
                        id="comment"
                        label="Comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="comment"
                        value={comment.body}
                        onChange={onBodyChangeHandler}
                    />
                </Box>
            </Box>

            <Box className="button-container">
                <Button variant="contained" type="submit">
                    Send
                </Button>
            </Box>
        </form>
    );
}
