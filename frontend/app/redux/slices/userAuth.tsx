import { createSlice } from "@reduxjs/toolkit";

const authData: any = {
  userInfo: null,
  isUserAuthenticated: false,
};
const userSlice = createSlice({
  name: "userAuth",
  initialState: authData,
  reducers: {
    setUserAuthData: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsUserAuthenticated: (state, action) => {
      state.isUserAuthenticated = action.payload;
    },
    removeUserAuthData: (state) => {
      state.userInfo = null;
      state.isUserAuthenticated = false;
    },
  },
});

export const { setUserAuthData, setIsUserAuthenticated, removeUserAuthData } =
  userSlice.actions;
export default userSlice.reducer;
