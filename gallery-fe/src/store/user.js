import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id: "",
  avatar: 0,
  name: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUser(state, action) {
      state.id = action.payload.id ?? state.id;
      state.avatar = action.payload.avatar ?? state.avatar;
      state.name = action.payload.name ?? state.name;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;