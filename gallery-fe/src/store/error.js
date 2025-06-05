import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialErrorState = {
  isError: false,
  type: undefined,
  errors: []
};

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: {
    addError(state, action) {
      state.errors = [...state.errors, { id: v4(), message: action.payload.message }];
    },
    removeError(state, action) {
      const leftErrors = state.errors.filter(error => error.id != action.payload);
      state.errors = leftErrors;
    },
    setError(state, action) {
      state.isError = true;
      state.type = action.payload;
    },
    unsetError(state) {
      state.isError = false;
    }
  }
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;