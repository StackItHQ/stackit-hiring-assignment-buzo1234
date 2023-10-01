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
            x.conditionType === action.payload.conditionType
          )
      );
      return { ...state, conditions: newConditions };

    case 'ADD_SORT':
      return { ...state, sortSpecs: [...state.sortSpecs, action.payload] };

    case 'REMOVE_SORT':
      const newSortSpecs = state.sortSpecs.filter(
        (x) =>
          !(
            x.columnName === action.payload.columnName &&
            x.sortSpec === action.payload.sortSpec
          )
      );
      return { ...state, sortSpecs: newSortSpecs };

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
