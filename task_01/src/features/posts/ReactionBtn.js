import { useDispatch } from "react-redux";
import { addPostReaction } from "./postsSlice";
import { Button } from "@mui/material";

export default function ReactionBtn({ post, nameEmoji, imageEmoji }) {
    const dispatch = useDispatch();

    return (
        <Button
            className="reaction-btn"
            onClick={() => dispatch(addPostReaction({ postId: post.id, reaction: nameEmoji }))}
        >
            {imageEmoji} {post.reactions[nameEmoji]}
        </Button>
    );
}