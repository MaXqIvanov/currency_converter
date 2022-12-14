import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetExchangeRates } from './ActionExchange';

export interface IExchangeState {
    loading: boolean
    currency_list_group: string[]
    currency_list: string[]
    error: string | null
    current_currency: string | null
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
    error: null,
    current_currency: null,
  },
  reducers: {
    setCurrentCurrency(state: IExchangeState, action: {payload: {currency: string}}){
        state.current_currency = action.payload.currency
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetExchangeRates.pending, (state: IExchangeState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
        GetExchangeRates.fulfilled,
      (
        state: IExchangeState,
        { payload }: PayloadAction<{
            response: { data: IPayloadGetExchangeRates }
        }>
      ) => {
        console.log(payload)
        let tmp_array: string[] = []
        state.currency_list_group = payload.response.data.data
        state.currency_list_group.forEach((element:string) => {
            tmp_array.push(element.split('')[0] + element.split('')[1] + element.split('')[2])
            tmp_array.push(element.split('')[3] + element.split('')[4] + element.split('')[5])
        });
        state.currency_list = Array.from(new Set(tmp_array))
        state.current_currency = state.currency_list[1]
        state.loading = false;
      }
    );
    builder.addCase(GetExchangeRates.rejected, (state: IExchangeState) => {
      state.loading = false;
    });
  },
});

export default ExchangeSlice.reducer;
export const { setCurrentCurrency } = ExchangeSlice.actions;