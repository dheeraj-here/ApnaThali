import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getSearch = createAsyncThunk("getSearch", async (search) => {
  return search;
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search:''
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.search = action.payload;
    });

  },
});

export default searchSlice.reducer;
