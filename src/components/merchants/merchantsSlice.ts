import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBill, fetchMerchants, removeBill } from '../../api/merchantsApi';
import { RootState } from '../../store/store';
import { MerchantType } from '../../shared/types';

interface MerchantsState {
  merchants: [] | Array<MerchantType>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: MerchantsState = {
  merchants: [],
  status: 'idle',
  error: null,
};

type MerchantIdActionPayload = {
  id: string;
};

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    toggleShowTransactions(state, action: PayloadAction<MerchantIdActionPayload>) {
      const { id } = action.payload;
      const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
      if (existingMerchant) {
        /*  if showTransactions is set, toggle it; if undefined, set to true  
            (showTransactions is internal only; it's not stored in the db)  */
        existingMerchant.showTransactions
          ? (existingMerchant.showTransactions = !existingMerchant.showTransactions)
          : (existingMerchant.showTransactions = true);
      }
    },
  },
  extraReducers(builder) {
    builder
      // fetchMerchants API call
      .addCase(fetchMerchants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMerchants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.merchants = state.merchants.concat(action.payload);
        }
      })
      .addCase(fetchMerchants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // removeBill API call
      .addCase(removeBill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
        if (existingMerchant) {
          existingMerchant.isBill = false;
        }
      })
      .addCase(removeBill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // addBill API call
      .addCase(addBill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
        if (existingMerchant) {
          existingMerchant.isBill = true;
        }
      })
      .addCase(addBill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectMerchants = (state: RootState) => state.merchants.merchants;
export const selectMerchantsStatus = (state: RootState) => state.merchants.status;
export const selectMerchantsError = (state: RootState) => state.merchants.error;

export const { toggleShowTransactions } = merchantsSlice.actions;

export default merchantsSlice.reducer;
