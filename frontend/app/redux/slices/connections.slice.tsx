import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [],
    isConnectionsLoading: false,
  },
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
    setConnectionsLoading: (state, action) => {
      state.isConnectionsLoading = action.payload;
    },
  },
});

export const { setConnections, setConnectionsLoading } =
  ConnectionsSlice.actions;
export default ConnectionsSlice.reducer;
