import { configureStore } from '@reduxjs/toolkit';
import merchantsReducer from './shared/components/merchants/merchantsSlice';

export const store = configureStore({
  reducer: {
    merchants: merchantsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {merchants: MerchantsState}
export type AppDispatch = typeof store.dispatch;
