'use client';

import { Dispatch, createContext, useReducer } from 'react';

const initialState = {
  fileName: '',
  tableRows: [],
  values: [],
  parsedData: [],
  csvString: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INSERT_ALL_DATA':
      return { ...state, ...action.payload };
    case 'CHANGE_SELECTED_HEADER':
      const newTableRows = state.tableRows.map((header, i) => {
        if (i == action.payload.id) {
          return { ...header, selected: action.payload.value };
        }
        return header;
      });
      return { ...state, tableRows: newTableRows };
    case 'INSERT_CSV_STRING':
      return { ...state, csvString: action.payload };
    case 'RESET':
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export const FileContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const FileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};
