import { RootState } from './../../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../plugins/axios';

export const GetExchangeRates = createAsyncThunk(
  'exchange/GetExchangeRates',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.get(`https://currate.ru/api/?get=currency_list`);
    console.log(response);
    return { response };
  }
);

export const GetCurrentExchangeRates = createAsyncThunk(
  'exchange/GetCurrentExchangeRates',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    console.log(rootState.exchange.currency_list);
    console.log(rootState.exchange.current_currency);
    let params = '';
    const list_group: string[] = rootState.exchange.currency_list_group;
    if (rootState.exchange.current_currency) {
      for (let i = 0; i < rootState.exchange.currency_list.length; i++) {
        for (let b = 0; b < list_group.length; b++) {
          if (
            list_group[b].includes(rootState.exchange.currency_list[i]) &&
            list_group[b].includes(rootState.exchange.current_currency) &&
            rootState.exchange.current_currency !== rootState.exchange.currency_list[i]
          ) {
            params =
              params +
              (rootState.exchange.current_currency + rootState.exchange.currency_list[i] + ',');
          }
        }
      }
    }

    const response = await api.get(`https://currate.ru/api/?get=rates&pairs=${params}`);
    console.log(response);
    return { response };
  }
);
