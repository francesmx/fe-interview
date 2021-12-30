import React from 'react';
import './App.css';
import { Header } from '../features/header/Header';
import { MerchantsList } from '../features/merchants/merchantsList/MerchantsList';

const App: React.FunctionComponent = () => (
  <div className="App">
    <Header />
    <MerchantsList />
  </div>
);

export default App;
