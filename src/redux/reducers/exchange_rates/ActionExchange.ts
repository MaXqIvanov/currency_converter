import { RootState } from './../../store';
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios";

export const GetExchangeRates = createAsyncThunk(
    'exchange/GetExchangeRates',
    async (_, { getState }) => {
      const rootState = getState() as RootState;
      const response = await api.get(`https://currate.ru/api/?get=currency_list`)
      console.log(response)
      return { response };
    }
  );