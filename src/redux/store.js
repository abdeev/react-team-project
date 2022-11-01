import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
  reducer: {},

  devTools: process.env.NODE_ENV === 'development',
});
export const persistor = persistStore(store);
