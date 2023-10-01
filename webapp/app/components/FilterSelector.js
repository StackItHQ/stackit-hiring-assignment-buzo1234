'use client';

import { FileContext } from '@/context/csv.context';
import React, { useContext } from 'react';

function FilterSelector() {
  const { state } = useContext(FileContext);

  const handleClick = async () => {
    fetch('/api/sheet', {
      method: 'POST',
      body: JSON.stringify({
        csvString: state?.csvString,
        headers: state?.tableRows,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('res is ', data);
      });
  };
  return (
    <div className='m-4'>
      <h2 className='text-lg text-zinc-800 font-semibold'>Add Filters</h2>
      <button onClick={handleClick}>Import</button>
    </div>
  );
}

export default FilterSelector;
