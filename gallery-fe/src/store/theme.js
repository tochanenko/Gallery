import { createSlice } from "@reduxjs/toolkit";

export const NIGHT_THEME = "night";
export const DAY_THEME = "day";

const initialThemeState = {
  theme: NIGHT_THEME
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === DAY_THEME ? NIGHT_THEME : DAY_THEME;
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;