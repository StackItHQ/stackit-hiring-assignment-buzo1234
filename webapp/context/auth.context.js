'use client';

import { createContext, useReducer } from 'react';

const initialState = {
  fullName: '',
  photo: '',
  accessToken: '',
  refreshToken: '',
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

export const AuthContext = createContext({
  authState: initialState,
  authDispatch: () => null,
});

export const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
