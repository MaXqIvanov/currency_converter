import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ConverterSlice from './reducers/converter/ConverterSlice';
import ExchangeSlice from './reducers/exchange_rates/ExchangeSlice';

const rootReducer = combineReducers({
  converter: ConverterSlice,
  exchange: ExchangeSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];