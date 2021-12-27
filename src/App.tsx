import React from 'react';
import './App.css';
import { Header } from './shared/Header';
import { Merchants } from './shared/components/Merchants';

const App: React.FunctionComponent = () => (
  <div className="App">
    <Header />
    <Merchants />
  </div>
);

export default App;
