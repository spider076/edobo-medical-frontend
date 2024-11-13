/* Core */
import { configureStore } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';

/* Instruments */
import { reducer } from './rootReducer';
import { middleware } from './middleware';

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware);
  }
});
export const persistor = persistStore(reduxStore);
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;
