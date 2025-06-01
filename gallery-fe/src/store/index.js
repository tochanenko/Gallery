import { configureStore } from "@reduxjs/toolkit"; 
import themeReducer from "./theme.js";
import userReducer from "./user.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer
  }
});

export default store;