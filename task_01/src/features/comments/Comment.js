import { Box, Typography } from "@mui/material";

export default function Comment({ author, content }) {
    return (
        <Box className="comment-block">
            <Typography variant="h5">{author}</Typography>
            <Typography variant="subtitle1">{content}</Typography>
        </Box>
    );
}
