'use client';

import { createContext, useReducer } from 'react';

const initialState = {
  sortSpecs: [],
  conditions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONDITION':
      return { ...state, conditions: [...state.conditions, action.payload] };

    case 'REMOVE_CONDITION':
      const newConditions = state.conditions.filter(
        (x) =>
          !(
            x.columnName === action.payload.columnName &&
            x.conditionType === action.payload.conditionType &&
            x.param === action.payload.param
          )
      );
      return { ...state, conditions: newConditions };

    case 'RESET':
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export const FilterContext = createContext({
  filterState: initialState,
  filterDispatch: () => null,
});

export const FilterContextProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(reducer, initialState);
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
