import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = "https://joybe-media.vercel.app";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${server}/api/comment`, data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (data, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${data.id}`, data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${server}/api/comment/${id}`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async ({ id, user_id }, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${id}/like`, {
        user_id,
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "comment/unlikeComment",
  async ({ id, user_id }, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${id}/unlike`, {
        user_id,
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(likeComment.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikeComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
