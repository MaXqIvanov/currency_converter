import { RootState } from './../../store';
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios";

export interface IGetCurrentRateParams {
    currency1: string,
    currency2: string
}
export const GetCurrentRate = createAsyncThunk(
    'converter/GetCurrentRate',
    async (params: IGetCurrentRateParams, { getState }) => {
      const rootState = getState() as RootState;
      const response = await api.get(`?get=rates&pairs=${params.currency1.toUpperCase()}${params.currency2.toUpperCase()}`)
      console.log(response)
      return { response, params };
    }
  );