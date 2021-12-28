import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIConstants } from '../../constants';

export type Transaction = {
  amount: number;
  date: string;
  id: number;
};

export type Merchant = {
  categoryID: number;
  iconUrl: string;
  id: string;
  isBill: boolean;
  name: string;
  transactions: Array<Transaction>;
  showTransactions: Boolean | undefined;
};

type MerchantIdActionPayload = {
  id: string;
};

interface MerchantsState {
  merchants: [] | Array<Merchant>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: MerchantsState = {
  merchants: [],
  status: 'idle',
  error: null,
};

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    toggleShowTransactions(state, action: PayloadAction<MerchantIdActionPayload>) {
      const { id } = action.payload;
      const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
      if (existingMerchant) {
        // showTransactions is internal only; it's not stored in the db
        // if showTransactions is set, toggle it; if undefined, set to true
        existingMerchant.showTransactions
          ? (existingMerchant.showTransactions = !existingMerchant.showTransactions)
          : (existingMerchant.showTransactions = true);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMerchants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMerchants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // add fetched merchants to array
        state.merchants = state.merchants.concat(action.payload);
      })
      .addCase(fetchMerchants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeBill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // update merchant
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
      .addCase(addBill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // update merchant
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

export const fetchMerchants = createAsyncThunk('merchants/fetchMerchants', async () => {
  try {
    const response = await axios.get(`${APIConstants.base}/merchants`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const removeBill = createAsyncThunk('merchants/removeBill', async (merchantId: string) => {
  try {
    const response = await axios.patch(`${APIConstants.base}/merchants/${merchantId}`, {
      isBill: false,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const addBill = createAsyncThunk('merchants/addBill', async (merchantId: string) => {
  try {
    const response = await axios.patch(`${APIConstants.base}/merchants/${merchantId}`, {
      isBill: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const { toggleShowTransactions } = merchantsSlice.actions;

export default merchantsSlice.reducer;
