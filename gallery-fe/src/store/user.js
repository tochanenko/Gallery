import { createSlice } from "@reduxjs/toolkit";
import { AvatarGenerator } from 'random-avatar-generator';

const initialUserState = {
  id: "",
  avatar: 0,
  name: "",
  avatarUrl: ""
};

const generator = new AvatarGenerator();

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUser(state, action) {
      state.id = action.payload.id ?? state.id;
      state.avatar = action.payload.avatar ?? state.avatar;
      state.name = action.payload.name ?? state.name;
      state.avatarUrl = generator.generateRandomAvatar(state.id + state.avatar)
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;