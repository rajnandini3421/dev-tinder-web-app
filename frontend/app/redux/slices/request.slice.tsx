import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    isRequestsLoading: false,
  },
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setIsRequestsLoading: (state, action) => {
      state.isRequestsLoading = action.payload;
    },
  },
});

export const { setRequests, setIsRequestsLoading } = RequestSlice.actions;
export default RequestSlice.reducer;
