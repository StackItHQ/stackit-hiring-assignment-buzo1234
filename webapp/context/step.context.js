'use client';

import { createContext, useReducer } from 'react';

const initialState = {
  step: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { ...state, step: 0 };
    default:
      return state;
  }
};

export const StepContext = createContext({
  stepState: initialState,
  stepDispatch: () => null,
});

export const StepContextProvider = ({ children }) => {
  const [stepState, stepDispatch] = useReducer(reducer, initialState);
  return (
    <StepContext.Provider value={{ stepState, stepDispatch }}>
      {children}
    </StepContext.Provider>
  );
};
