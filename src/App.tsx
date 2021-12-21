import React from 'react';
import './App.css';
import { Header } from './shared/Header';
import { Bills } from './shared/Bills';

const App: React.FunctionComponent = () => (
  <div className="App">
    <Header />
    <Bills />
  </div>
);

export default App;
