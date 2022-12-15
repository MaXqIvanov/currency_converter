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

export const GetCurrentExchangeRates = createAsyncThunk(
  'exchange/GetCurrentExchangeRates',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    console.log(rootState.exchange.currency_list)
    console.log(rootState.exchange.current_currency)
    let params = rootState.exchange.currency_list.reduce((acc: string, val: string, index: number)=> index === 0 ? acc + (rootState.exchange.current_currency + val) : acc + (',' + rootState.exchange.current_currency + val), '')
    const response = await api.get(`https://currate.ru/api/?get=rates&pairs=${params}`)
    console.log(response)
    return { response };
  }
);