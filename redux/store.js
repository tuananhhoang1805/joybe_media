import { configureStore } from "@reduxjs/toolkit";
import { root } from "postcss";


const store = configureStore({
    reducer: root
})

export default store