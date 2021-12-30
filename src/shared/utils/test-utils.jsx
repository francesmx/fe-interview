// Custom render as recommended here:
// https://redux.js.org/usage/writing-tests#connected-components

import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import merchantsReducer from '../components/merchantsList/merchantsSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { merchants: merchantsReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
