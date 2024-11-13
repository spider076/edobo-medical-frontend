import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  categories: [],
  newCategories: [],
  isLoading: true
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload.data;
      state.newCategories = action.payload.newCategories;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setCategories } = slice.actions;

// ----------------------------------------------------------------------
