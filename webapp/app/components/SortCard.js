'use client';

import React, { useContext, useState } from 'react';
import { sortSpecs } from '@/DATA/filterData';
import { FilterContext } from '@/context/filter.context';

function SortCard({ headers }) {
  const [column, setColumn] = useState();
  const [sort, setSort] = useState();

  const { filterDispatch } = useContext(FilterContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (column?.length < 1 || sort?.length < 1) return;

    filterDispatch({
      type: 'ADD_SORT',
      payload: {
        sortSpec: sort,
        columnName: column,
      },
    });

    setColumn('');
    setSort('');
  }

  return (
    <div className='bg-white shadow-md rounded-md text-zinc-700 p-3'>
      <form
        className='flex flex-col gap-2 justify-center items-center'
        onSubmit={(e) => handleSubmit(e)}
      >
        <select
          name='header'
          id='header'
          value={column}
          className='w-full flex px-2 py-1 text-zinc-600 rounded-md border-[1.5px] border-gray-300'
          onChange={(e) => setColumn(e.target.value)}
        >
          <option diabled selected value=''>
            Select Column
          </option>
          {headers.map((head, i) => {
            if (head.selected) {
              return (
                <option key={i} value={head.name}>
                  {head.name}
                </option>
              );
            }
          })}
        </select>

        <select
          name='sort'
          id='sort'
          value={sort}
          className='w-full flex px-2 py-1 text-zinc-600 rounded-md border-[1.5px] border-gray-300'
          onChange={(e) => setSort(e.target.value)}
        >
          <option diabled selected value=''>
            Sort by
          </option>
          {sortSpecs.map((sortSpec, i) => {
            return (
              <option key={i} value={sortSpec.id}>
                {sortSpec.name}
              </option>
            );
          })}
        </select>

        <button
          className='px-3 py-2 bg-blue-500 rounded-lg text-white flex w-full justify-center'
          type='submit'
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default SortCard;
