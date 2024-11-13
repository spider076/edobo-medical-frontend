import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  themeMode: 'light',
  openSidebar: false,
  currency: process.env.BASE_CURRENCY || 'USD',
  rate: 1
};

// slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    toggleSidebar(state, action) {
      state.openSidebar = action.payload;
    },
    handleChangeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.rate = action.payload.rate;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setThemeMode, toggleSidebar, handleChangeCurrency } = slice.actions;

// ----------------------------------------------------------------------
