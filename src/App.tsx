import React from 'react';
import { Header } from './components/header/Header';
import { MerchantsList } from './components/merchants/merchantsList/MerchantsList';
import { GlobalStyles } from './GlobalStyles';

const App: React.FunctionComponent = () => (
  <div>
    <GlobalStyles />
    <Header />
    <MerchantsList />
  </div>
);

export default App;
