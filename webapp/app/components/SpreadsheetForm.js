import React from 'react';

function SpreadsheetForm({ setSsid, setSid }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 items-center w-full gap-2 px-4 '>
      <input
        onChange={(e) => setSsid(e.target.value)}
        className='px-3 flex py-2 rounded-lg bg-white border-[1.5px] border-gray-800 font-medium'
        type='text'
        placeholder='Spreadsheet ID'
      />
      <input
        onChange={(e) => setSid(e.target.value)}
        className='px-3 flex py-2 rounded-lg bg-white border-[1.5px] border-gray-800 font-medium'
        type='text'
        placeholder='Sheet ID'
      />
    </div>
  );
}

export default SpreadsheetForm;
