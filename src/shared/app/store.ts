import { configureStore } from '@reduxjs/toolkit';
import merchantsReducer from '../features/merchants/merchantsSlice';

export const store = configureStore({
  reducer: {
    merchants: merchantsReducer,
  },
});

// Infers the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infers type: {merchants: MerchantsState}
export type AppDispatch = typeof store.dispatch;
