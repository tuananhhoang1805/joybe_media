import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import commentsReducer from "./commetSlice";
const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentsReducer,
  },
});

export default store;
