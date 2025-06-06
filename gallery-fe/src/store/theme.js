import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_THEME, LOCAL_THEME_MODE } from "../lib/constants";

export const THEME_NIGHT = "night";
export const THEME_DAY = "day";

export const MODE_AUTO = "mode_auto";
export const MODE_USER = "mode_user";

const initialThemeState = {
  theme: localStorage.getItem(LOCAL_THEME) ?? THEME_NIGHT,
  mode: localStorage.getItem(LOCAL_THEME_MODE) ?? MODE_AUTO
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === THEME_DAY ? THEME_NIGHT : THEME_DAY;
      localStorage.setItem(LOCAL_THEME, state.theme);
    },
    changeMode(state, action) {
      state.mode = action.payload;
      localStorage.setItem(LOCAL_THEME_MODE, state.mode);
    },
    setNightTheme(state) {
      state.theme = THEME_NIGHT;
      state.mode = MODE_USER;
      localStorage.setItem(LOCAL_THEME, state.theme);
      localStorage.setItem(LOCAL_THEME_MODE, state.mode);
    },
    setDayTheme(state) {
      state.theme = THEME_DAY;
      state.mode = MODE_USER;
      localStorage.setItem(LOCAL_THEME, state.theme);
      localStorage.setItem(LOCAL_THEME_MODE, state.mode);
    },
    setAutoMode(state) {
      state.mode = MODE_AUTO;
      localStorage.setItem(LOCAL_THEME_MODE, state.mode);
    },
    setUserMode(state) {
      state.mode = MODE_USER;
      localStorage.setItem(LOCAL_THEME_MODE, state.mode);
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;