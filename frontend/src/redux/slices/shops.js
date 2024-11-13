import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  shops: [],
  isLoading: true
};

const slice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setShops(state, action) {
      state.shops = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setShops } = slice.actions;

// ----------------------------------------------------------------------
