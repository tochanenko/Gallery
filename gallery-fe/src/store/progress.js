import { createSlice } from "@reduxjs/toolkit";

const initialProgressState = {
  loading: false
};

const progressSlice = createSlice({
  name: 'progress',
  initialState: initialProgressState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const progressActions = progressSlice.actions;
export default progressSlice.reducer;