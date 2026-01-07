import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedUsers: [],
  },
  reducers: {
    setFeedUsers: (state, action) => {
      state.feedUsers = action.payload;
    },
  },
});
export const { setFeedUsers } = feedSlice.actions;
export default feedSlice.reducer;
