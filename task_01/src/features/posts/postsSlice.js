import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    isLoading: false,
    error: null
}

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        try {
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const addPost = createAsyncThunk(
    "posts/addPost",
    async (initialPost) => {
        const response = await fetch(
            URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(initialPost)
            }
        );

        return response.json();
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (initialPost) => {
        const response = await fetch(
            URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(initialPost)
            }
        );
        
        return response.json();
    }
)

export const removePost = createAsyncThunk(
    "posts/removePost",
    async (id) => {
        try {
            const response = await fetch(`${URL}/${id}`, { method: 'DELETE' });

            if (!response.ok)
            {
                throw new Error(`Response status: ${response.status}`);
            }

            return { id };
        }
        catch (error) {
            return error.message;
        }
    }
);

export const postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {
        addPostReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;

            const loadedPosts = action.payload.map(post =>
            {
                post.reactions = {
                    thumbsUp: 0,
                    thumbsDown: 0
                }

                return post;
            });
            state.posts = loadedPosts;
        });

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(addPost.fulfilled, (state, action) => {
            action.payload.id = state.posts[state.posts.length - 1].id + 1;
            action.payload.reactions = {
                thumbsUp: 0,
                thumbsDown: 0,
            }

            state.posts.push(action.payload);
        });

        builder.addCase(editPost.fulfilled, (state, action) => {
            action.payload.reactions = {
                thumbsUp: 0,
                thumbsDown: 0,
            }

            state.posts.push(action.payload);
        });

        builder.addCase(removePost.fulfilled, (state, action) => {
            if (!action?.payload.id) {
                console.log("could not delete");
                return;
            }
            
            const { id } = action.payload;
            const updatedPosts = state.posts.filter(post => post.id !== id);

            state.posts = updatedPosts;
        });
    }
});

export const { addPostReaction } = postsSlice.actions;

export default postsSlice.reducer;
