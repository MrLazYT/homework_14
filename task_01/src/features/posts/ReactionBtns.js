import { useSelector } from "react-redux";
import ReactionBtn from "./ReactionBtn";
import { Box, ButtonGroup } from "@mui/material";

const reactionEmojis = {
    thumbsUp: "👍",
    thumbsDown: "👎",
};

export default function ReactionBtns({ id }) {
    const posts = useSelector((state) => state.posts.posts);
    const post = posts.find((post) => post.id === id);

    const reactionButtons = Object.entries(reactionEmojis).map(([nameEmoji, imageEmoji]) => {
        return <ReactionBtn key={nameEmoji} post={post} nameEmoji={nameEmoji} imageEmoji={imageEmoji} />;
    });

    return (
        <Box>
            <ButtonGroup className="button-group">{reactionButtons}</ButtonGroup>
        </Box>
    );
}