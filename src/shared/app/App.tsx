import React from 'react';
import './App.css';
import { Header } from '../components/header/Header';
import { MerchantsList } from '../components/merchants/merchantsList/MerchantsList';

const App: React.FunctionComponent = () => (
  <div className="App">
    <Header />
    <MerchantsList />
  </div>
);

export default App;
