import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { CurrencyConverter } from './pages/CurrencyConverter';
import { ExchangeRates } from './pages/ExchangeRates';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route
            path={'/'}
            element={<CurrencyConverter />}
          />
          <Route
            path={'/exchange_rates'}
            element={<ExchangeRates />}
          />
      </Routes>
    </div>
  );
}

export default App;
