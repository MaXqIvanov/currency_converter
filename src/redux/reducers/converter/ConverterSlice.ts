import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetCurrentRate, IGetCurrentRateParams } from './ActionConverter';

export interface IConverterState {
  loading: boolean;
  loading_currency: boolean;
  current_currency_value: string | null;
  error: string | null;
}

interface IPayloadGetCurrentRate {
  status: number;
  message: string;
  data: any;
}

const ConverterSlice = createSlice({
  name: 'converter',
  initialState: {
    loading: false,
    loading_currency: false,
    current_currency_value: null,
    error: null,
  },
  reducers: {
    clearCurrentCurrencyValue(state: IConverterState) {
      state.current_currency_value = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetCurrentRate.pending, (state: IConverterState, action: PayloadAction) => {
      state.loading_currency = true;
    });
    builder.addCase(
      GetCurrentRate.fulfilled,
      (
        state: IConverterState,
        {
          payload,
        }: PayloadAction<{
          params: IGetCurrentRateParams;
          response: { data: IPayloadGetCurrentRate };
        }>
      ) => {
        if (payload.response.data.status < 400) {
          state.error = null;
          state.current_currency_value = Object.values(payload.response.data.data)[0] as string;
        } else {
          state.error = 'Данной пары не было найдено';
        }
        state.loading_currency = false;
      }
    );
    builder.addCase(GetCurrentRate.rejected, (state: IConverterState) => {
      state.loading_currency = false;
    });
  },
});

export default ConverterSlice.reducer;
export const { clearCurrentCurrencyValue } = ConverterSlice.actions;
