import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "@/types";

interface userState {
  user: IUser;
}

const initialState: userState = {
  user: {
    _id: "",
    email: "",
    role: "",
    provider: "",
    profile: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      image: "",
    },
    createdAt: "",
    updatedAt: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
