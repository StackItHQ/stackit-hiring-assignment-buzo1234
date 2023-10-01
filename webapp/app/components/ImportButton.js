'use client';

import { FileContext } from '@/context/csv.context';
import { FilterContext } from '@/context/filter.context';
import React, { useContext, useState } from 'react';

function ImportButton() {
  const { state } = useContext(FileContext);
  const { filterState } = useContext(FilterContext);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (state?.csvString.length < 1) return;
    setLoading(true);
    fetch('/api/sheet', {
      method: 'POST',
      body: JSON.stringify({
        csvString: state?.csvString,
        headers: state?.tableRows,
        conditions: filterState?.conditions,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('res is ', data);
      })
      .finally(() => setLoading(false));
  };

  if (state.tableRows.length < 1) {
    return <></>;
  }

  return (
    <div className='flex m-4 justify-center'>
      <button
        onClick={handleClick}
        disable={loading}
        className={
          loading
            ? 'bg-zinc-300 px-4 py-3 w-full text-black font-semibold cursor-not-allowed rounded-lg'
            : 'bg-green-500 px-4 py-3 w-full text-white font-semibold rounded-lg'
        }
      >
        {loading ? 'Importing...' : 'Import'}
      </button>
    </div>
  );
}

export default ImportButton;
