import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBill, fetchMerchants, removeBill } from './merchantsThunks';
import { RootState } from '../../store/store';
import { MerchantType } from '../../shared/types';

type apiCallStatus = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

type MerchantsState = {
  merchants: [] | Array<MerchantType>;
  fetch: apiCallStatus;
  addBill: apiCallStatus;
  removeBill: apiCallStatus;
};

const initialState: MerchantsState = {
  merchants: [],
  fetch: {
    status: 'idle',
    error: undefined,
  },
  addBill: {
    status: 'idle',
    error: undefined,
  },
  removeBill: {
    status: 'idle',
    error: undefined,
  },
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
      /* ********** fetchMerchants API call ********** */
      .addCase(fetchMerchants.pending, (state) => {
        state.fetch.status = 'loading';
      })
      .addCase(fetchMerchants.fulfilled, (state, action) => {
        state.fetch.status = 'succeeded';
        if (action.payload) {
          state.merchants = state.merchants.concat(action.payload);
        }
      })
      .addCase(fetchMerchants.rejected, (state, action) => {
        state.fetch.status = 'failed';
        state.fetch.error = action.error.message;
      })
      /* ********** removeBill API call ********** */
      .addCase(removeBill.pending, (state) => {
        state.removeBill.status = 'loading';
      })
      .addCase(removeBill.fulfilled, (state, action) => {
        state.removeBill.status = 'succeeded';
        const { id } = action.payload;
        const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
        if (existingMerchant) {
          existingMerchant.isBill = false;
        }
      })
      .addCase(removeBill.rejected, (state, action) => {
        state.removeBill.status = 'failed';
        state.removeBill.error = action.error.message;
      })
      /* ********** addBill API call ********** */
      .addCase(addBill.pending, (state) => {
        state.addBill.status = 'loading';
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.addBill.status = 'succeeded';
        const { id } = action.payload;
        const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
        if (existingMerchant) {
          existingMerchant.isBill = true;
        }
      })
      .addCase(addBill.rejected, (state, action) => {
        state.addBill.status = 'failed';
        state.addBill.error = action.error.message;
      });
  },
});

export const selectMerchants = (state: RootState) => state.merchants.merchants;

export const selectMerchantsStatus = (state: RootState) => state.merchants.fetch.status;
export const selectMerchantsError = (state: RootState) => state.merchants.fetch.error;

export const addBillStatus = (state: RootState) => state.merchants.addBill.status;
export const addBillError = (state: RootState) => state.merchants.addBill.error;

export const removeBillStatus = (state: RootState) => state.merchants.removeBill.status;
export const removeBillError = (state: RootState) => state.merchants.removeBill.error;

export const { toggleShowTransactions } = merchantsSlice.actions;

export default merchantsSlice.reducer;
