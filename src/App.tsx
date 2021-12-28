import React from 'react';
import './App.css';
import { Header } from './shared/components/header/Header';
import { MerchantsList } from './shared/components/merchantsList/MerchantsList';

const App: React.FunctionComponent = () => (
  <div className="App">
    <Header />
    <MerchantsList />
  </div>
);

export default App;
