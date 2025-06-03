import { configureStore } from "@reduxjs/toolkit"; 
import themeReducer from "./theme.js";
import userReducer from "./user.js";
import progressReducer from "./progress.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    progress: progressReducer
  }
});

export default store;