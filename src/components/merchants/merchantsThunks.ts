import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIConstants } from '../../shared/utils/constants';

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
