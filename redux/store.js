import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import commentsReducer from "./commetSlice";
import modalReducer from "./modalSlice";
const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentsReducer,
    modal: modalReducer,
  },
});

export default store;
