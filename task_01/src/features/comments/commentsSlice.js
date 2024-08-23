import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = "https://jsonplaceholder.typicode.com/comments";

const initialState = {
    comments: [],
    isLoading: false,
    error: null
}

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
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

export const addComment = createAsyncThunk(
    "comments/addComment",
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

export const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        });

        builder.addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(addComment.fulfilled, (state, action) => {
            action.payload.id = state.comments[state.comments.length - 1].id + 1;
            state.comments.push(action.payload);
        });
    }
});

export default commentsSlice.reducer;