import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = "http://localhost:3000";

const initialState = {
  feedPosts: [],
  message: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  isEdit: false,
  singlePost: null,
  postId: "",
};

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`${server}/api/post/${id}`);

      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithMessage(message);
    }
  }
);
export const getFeedPosts = createAsyncThunk(
  "posts/getFeedPosts",
  async (thunkApi) => {
    try {
      const res = await axios.get(`${server}/api/post`, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithMessage(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkApi) => {
    try {
      const res = await axios.post(`${server}/api/post`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithMessage(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkApi) => {
    try {
      const res = await axios.delete(`${server}/api/post/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithMessage(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, status }, thunkApi) => {
    try {
      const res = await axios.patch(
        `${server}/api/post/${id}`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithMessage(message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ id, user_id }, thunkApi) => {
    try {
      const res = await axios.patch(`${server}/api/post/${id}/like`, {
        user_id,
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ id, user_id }, thunkApi) => {
    try {
      const res = await axios.patch(`${server}/api/post/${id}/unlike`, {
        user_id,
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    changeEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singlePost = action.payload.post;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.post;
      })
      .addCase(getFeedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedPosts = action.payload;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedPosts = [action.payload, { ...state.feedPosts }];
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.feedPosts = state.feedPosts.post.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.feedPosts = state.feedPosts.post.map((post) =>
          post._id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedPosts = state.feedPosts.post.map((post) =>
          post._id === action.payload.id ? action.payload.post : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedPosts = state.feedPosts.post.map((post) =>
          post._id === action.payload.id ? action.payload.post : post
        );
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, changeEdit, setPostId } = postSlice.actions;

export default postSlice.reducer;
