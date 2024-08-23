import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "../comments/AddComment";
import Comments from "../comments/Comments";
import { Box, Typography } from "@mui/material";

export default function PostPage() {
    const params = useParams();
    const id = params.id;
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find((post) => post.id === +id);

    return (
        <Box>
            <Typography variant="h4">{post.title}</Typography>

            <Box className="post-pub-info">
                <Typography variant="subtitle1">{post.author}</Typography>
                <Typography variant="subtitle1">{post.publishing_date}</Typography>
            </Box>

            <Typography variant="subtitle1">{post.body}</Typography>

            <AddComment />
            <Comments postId={post.id} />
        </Box>
    );
}
