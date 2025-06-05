import { configureStore } from "@reduxjs/toolkit"; 
import themeReducer from "./theme.js";
import userReducer from "./user.js";
import progressReducer from "./progress.js";
import errorReducer from "./error.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    progress: progressReducer,
    error: errorReducer
  }
});

export default store;