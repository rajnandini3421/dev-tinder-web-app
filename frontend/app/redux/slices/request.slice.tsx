import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { setRequests } = RequestSlice.actions;
export default RequestSlice.reducer;
