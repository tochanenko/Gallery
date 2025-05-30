import { configureStore } from "@reduxjs/toolkit"; 
import themeReducer from "./theme.js";

const store = configureStore({
  reducer: {
    theme: themeReducer
  }
});

export default store;