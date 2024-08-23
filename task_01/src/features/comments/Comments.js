import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { fetchComments } from "./commentsSlice";

export default function Comments({ postId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const comments = useSelector((state) => state.comments.comments);
    const isLoading = useSelector((state) => state.comments.isLoading);
    const error = useSelector((state) => state.comments.error);
    
    if (isLoading) {
        return "Loading...";
    }

    if (error) {
        return error;
    }

    return (
        <Box className="comments-block">
            <Typography variant="h6">Comments:</Typography>

            {comments.map((comment) => {
                if (comment.postId === postId)
                {
                    return <Comment key={comment.id} author={comment.name} content={comment.body} />;
                }

                return null;
            })}
        </Box>
    );
}
