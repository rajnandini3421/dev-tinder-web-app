import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feedUsers: [],
    isFeedLoading: false,
  },
  reducers: {
    setFeedUsers: (state, action) => {
      state.feedUsers = action.payload;
    },
    setIsFeedLoading: (state, action) => {
      state.isFeedLoading = action.payload;
    },
  },
});
export const { setFeedUsers, setIsFeedLoading } = feedSlice.actions;
export default feedSlice.reducer;
