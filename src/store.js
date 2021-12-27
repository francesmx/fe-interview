import { configureStore } from '@reduxjs/toolkit';
import merchantsReducer from '../src/shared/components/merchantsSlice';

export default configureStore({
  reducer: {
    merchants: merchantsReducer,
  },
});
