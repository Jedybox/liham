import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  image: string[];
  bio: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  image: [],
  bio: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.bio = action.payload.bio;
    },
    clearUser(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image = [];
      state.bio = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
