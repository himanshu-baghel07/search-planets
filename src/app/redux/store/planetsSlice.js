import { createSlice } from "@reduxjs/toolkit";

const planetSlice = createSlice({
  name: "planets",
  initialState: {
    planets: [],
    filters: {
      color: [],
      shape: [],
      size: [],
    },
    searchText: "",
  },
  reducers: {
    setPlanets(state, action) {
      state.planets = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
});

export const { setPlanets, setFilters, setSearchText } = planetSlice.actions;
export default planetSlice.reducer;
