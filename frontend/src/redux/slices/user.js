import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

// initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  location: null,
  count: 0,
  isInitialized: false,
  followingShops: []
};

// slice
const slice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLocation(state, action) {
      state.location = action.payload;
      window.localStorage.setItem('location', JSON.stringify(action.payload));
    },
    setCount(state) {
      state.count = state.count + 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
    updateStatus(state, action) {
      state.user.status = action.payload;
    },
    verifyUser(state) {
      state.user.isVerified = true;
    },
    updateUserRole(state) {
      state.user.role = 'vendor';
    },
    updateFollowShop(state, action) {
      const filtered = state.followingShops.filter((v) => v === action.payload);
      if (filtered.length) {
        const removedShop = state.followingShops.filter((v) => v !== action.payload);
        state.followingShops = removedShop;
      } else {
        state.followingShops = [...state.followingShops, action.payload];
      }
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLogin,
  setLogout,
  setLocation,
  setCount,
  setInitialize,
  updateStatus,
  verifyUser,
  updateUserRole,
  updateFollowShop
} = slice.actions;

// ----------------------------------------------------------------------
