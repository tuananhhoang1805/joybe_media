import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModalCreatePost: false,
  openModalComment: false,
  statusPost: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },

    openCreatePost: (state) => {
      state.openModalCreatePost = true;
      state.statusPost = "create";
    },

    openEditPost: (state) => {
      state.openModalCreatePost = true;
      state.statusPost = "edit";
    },
    closePost: (state) => {
      state.openModalCreatePost = false;
      state.statusPost = "";
    },
    openEditComment: (state) => {
      state.openModalComment = true;
    },
    closeEditComment: (state) => {
      state.openModalComment = false;
    },
  },
});

export const {
  reset,
  openCreatePost,
  openEditPost,
  closePost,
  openEditComment,
  closeEditComment,
} = modalSlice.actions;

export default modalSlice.reducer;
