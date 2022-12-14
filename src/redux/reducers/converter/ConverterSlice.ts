import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface converterState {
    loading: boolean
}

const ConverterSlice = createSlice({
  name: 'converter',
  initialState: {
    // loading
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(UserLogout.pending, (state: converterState, action: PayloadAction) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   UserLogout.fulfilled,
    //   (
    //     state: converterState,
    //     { payload }: PayloadAction<any>
    //   ) => {
    //     state.loading = false;
    //   }
    // );
    // builder.addCase(UserLogout.rejected, (state: converterState) => {
    //   state.loading = false;
    // });
  },
});

export default ConverterSlice.reducer;
export const {} = ConverterSlice.actions;