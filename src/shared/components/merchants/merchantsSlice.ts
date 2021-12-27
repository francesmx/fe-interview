import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIConstants } from '../../constants';

type Transaction = {
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
    billAdded(state, action: PayloadAction<MerchantIdActionPayload>) {
      const { id } = action.payload;
      const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
      if (existingMerchant) {
        existingMerchant.isBill = true;
      }
    },
    billRemoved(state, action: PayloadAction<MerchantIdActionPayload>) {
      const { id } = action.payload;
      const existingMerchant = state.merchants.find((merchant) => merchant.id === id);
      if (existingMerchant) {
        existingMerchant.isBill = false;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMerchants.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMerchants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched merchants to the array
        state.merchants = state.merchants.concat(action.payload);
      })
      .addCase(fetchMerchants.rejected, (state, action) => {
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

export const addBill = createAsyncThunk('merchants/removeBill', async (merchantId: string) => {
  try {
    const response = await axios.patch(`${APIConstants.base}/merchants/${merchantId}`, {
      isBill: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const { billAdded, billRemoved } = merchantsSlice.actions;

export default merchantsSlice.reducer;
