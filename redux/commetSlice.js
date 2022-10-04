import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = "http://localhost:3000";

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

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
