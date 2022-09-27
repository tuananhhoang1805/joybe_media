import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:3000";
const initialState = {
  searchUsers: [],
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
  searchBar: false,
  posts: [],
  users: [],
};

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`${server}/api/user/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res.data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
