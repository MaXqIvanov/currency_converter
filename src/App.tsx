import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { CurrencyConverter } from './pages/CurrencyConverter';
import { ExchangeRates } from './pages/ExchangeRates';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
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
