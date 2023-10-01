'use client';

import { FileContext } from '@/context/csv.context';
import React, { useContext } from 'react';
import HeaderSelector from './HeaderSelector';

function ShowHeaders() {
  const { state } = useContext(FileContext);
  return (
    <div className='m-4'>
      {state && state.tableRows?.length > 0 && (
        <div>
          <h2 className='text-lg text-zinc-800 font-semibold'>
            Please select the headers to include:
          </h2>
          {state.tableRows.map((header, i) => {
            return <HeaderSelector key={i} header={header} id={i} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ShowHeaders;
