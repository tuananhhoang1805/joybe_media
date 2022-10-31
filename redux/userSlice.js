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
  singleUser: null,
};
export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`${server}/api/user/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUserPost = createAsyncThunk(
  "user/getUserPost",
  async (id, thunkApi) => {
    try {
      const res = await axios.get(`${server}/api/post/userpost/${id}`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getSearchUsers = createAsyncThunk(
  "user/searchUsers",
  async (searchValue, thunkApi) => {
    try {
      const res = await axios.get(
        `${server}/api/user/search?name=${searchValue}`
      );
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({id, data}, thunkApi) => {
    try {
      const res = await axios.put(`${server}/api/user/${id}`, data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ id, user_id }, thunkApi) => {
    try {
      await axios.patch(`${server}/api/user/${id}/follow`, { user_id });

      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ id, user_id }, thunkApi) => {
    try {
      await axios.patch(`${server}/api/user/${id}/unfollow`, { user_id });

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
    clearUser: (state) => {
      state.searchUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.singleUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getUserPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSearchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchUsers = action.payload.users;
      })
      .addCase(getSearchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        console.log({ action: action.payload });
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unFollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearUser } = userSlice.actions;

export default userSlice.reducer;
