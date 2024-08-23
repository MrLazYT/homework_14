import Post from "./Post";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Posts({ posts }) {
    const navigate = useNavigate();

    const addPostOnClick = () => {
        navigate("/add-post");
    };
    
    return (
        <Box>
            <Typography className="typography" variant="h4">
                Posts
            </Typography>

            <Box className="button-container">
                <Button variant="contained" onClick={addPostOnClick}>
                    Add Post
                </Button>
            </Box>

            {posts.map((post) => {
                return <Post key={post.id} id={post.id} title={post.title} content={post.body} />;
            })}
        </Box>
    );
}
