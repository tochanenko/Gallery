import { createSlice } from "@reduxjs/toolkit";

export const THEME_NIGHT = "night";
export const THEME_DAY = "day";

export const MODE_AUTO = "mode_auto";
export const MODE_USER = "mode_user";

const initialThemeState = {
  theme: THEME_NIGHT,
  mode: MODE_AUTO
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === THEME_DAY ? THEME_NIGHT : THEME_DAY;
    },
    changeMode(state, action) {
      state.mode = action.payload;
    },
    setNightTheme(state) {
      state.theme = THEME_NIGHT;
      state.mode = MODE_USER;
    },
    setDayTheme(state) {
      state.theme = THEME_DAY;
      state.mode = MODE_USER;
    },
    setAutoMode(state) {
      state.mode = MODE_AUTO;
    },
    setUserMode(state) {
      state.mode = MODE_USER;
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;