import { RootState } from './../../store';
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios";

export interface IGetCurrentRateParams {
    value1: string,
    value2: string
}
export const GetCurrentRate = createAsyncThunk(
    'converter/GetCurrentRate',
    async (params: IGetCurrentRateParams, { getState }) => {
      const rootState = getState() as RootState;
      const response = await api.get(`?get=rates&pairs=${params.value1.toUpperCase()}${params.value2.toUpperCase()}`)
      console.log(response)
      return { response, params };
    }
  );