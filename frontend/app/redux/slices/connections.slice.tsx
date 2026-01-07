import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [],
  },
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
  },
});

export const { setConnections } = ConnectionsSlice.actions;
export default ConnectionsSlice.reducer;
