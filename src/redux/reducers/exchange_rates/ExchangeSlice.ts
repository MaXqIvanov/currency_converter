import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { GetCurrentExchangeRates, GetExchangeRates } from './ActionExchange';

export interface IExchangeState {
  loading: boolean;
  currency_list_group: string[];
  currency_list: string[];
  currency_list_with_value: object[];
  error: string | null;
  current_currency: string | null;
}

interface IPayloadGetExchangeRates {
  status: number;
  message: string;
  data: any;
}

const ExchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    loading: false,
    currency_list_group: [],
    currency_list: [],
    currency_list_with_value: [],
    error: null,
    current_currency: null,
  },
  reducers: {
    setCurrentCurrency(
      state: IExchangeState,
      action: { payload: { currency: string; navigate: NavigateFunction } }
    ) {
      state.current_currency = action.payload.currency;
      action.payload.navigate(`/exchange_rates?rate=${action.payload.currency}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetExchangeRates.pending, (state: IExchangeState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      GetExchangeRates.fulfilled,
      (
        state: IExchangeState,
        {
          payload,
        }: PayloadAction<{
          response: { data: IPayloadGetExchangeRates };
        }>
      ) => {
        console.log(payload);
        const tmp_array: string[] = [];
        state.currency_list_group = payload.response.data.data;
        state.currency_list_group.forEach((element: string) => {
          tmp_array.push(element.split('')[0] + element.split('')[1] + element.split('')[2]);
          tmp_array.push(element.split('')[3] + element.split('')[4] + element.split('')[5]);
        });
        state.currency_list = Array.from(new Set(tmp_array));
        const search = window.location.search.split('=')[1];
        if (search) {
          state.current_currency = search;
        } else {
          state.current_currency = state.currency_list[1];
        }
        state.loading = false;
      }
    );
    builder.addCase(GetExchangeRates.rejected, (state: IExchangeState) => {
      state.loading = false;
    });
    // GetCurrentExchangeRates
    builder.addCase(
      GetCurrentExchangeRates.pending,
      (state: IExchangeState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      GetCurrentExchangeRates.fulfilled,
      (
        state: IExchangeState,
        {
          payload,
        }: PayloadAction<{
          response: { data: IPayloadGetExchangeRates };
        }>
      ) => {
        console.log(payload.response.data.data);
        state.currency_list_with_value = Object.entries(payload.response.data.data);
        state.loading = false;
      }
    );
    builder.addCase(GetCurrentExchangeRates.rejected, (state: IExchangeState) => {
      state.loading = false;
    });
  },
});

export default ExchangeSlice.reducer;
export const { setCurrentCurrency } = ExchangeSlice.actions;
