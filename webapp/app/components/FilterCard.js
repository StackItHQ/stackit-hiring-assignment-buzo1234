'use client';

import React, { useContext, useState } from 'react';
import { conditionTypes } from '@/DATA/filterData';
import { FilterContext } from '@/context/filter.context';

function FilterCard({ headers }) {
  const [column, setColumn] = useState();
  const [sort, setSort] = useState();
  const [condition, setCondition] = useState();
  const [param, setParam] = useState('');

  const { filterDispatch } = useContext(FilterContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (column?.length < 1 || condition?.length < 1 || param?.length < 1)
      return;

    filterDispatch({
      type: 'ADD_CONDITION',
      payload: {
        conditionType: condition,
        columnName: column,
        param: param,
      },
    });

    setColumn('');
    setCondition('');
    setParam('');
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
            return (
              <option key={i} value={head.name}>
                {head.name}
              </option>
            );
          })}
        </select>

        <select
          name='header'
          id='header'
          value={condition}
          className='w-full flex px-2 py-1 text-zinc-600 rounded-md border-[1.5px] border-gray-300'
          onChange={(e) => setCondition(e.target.value)}
        >
          <option diabled selected value=''>
            Condition
          </option>
          {conditionTypes.map((conditionType, i) => {
            return (
              <option key={i} value={conditionType.id}>
                {conditionType.name}
              </option>
            );
          })}
        </select>

        {condition && (
          <input
            type='text'
            placeholder='Enter value'
            value={param}
            className='w-full flex px-2 py-1 text-zinc-600 rounded-md border-[1.5px] bg-gray-100 border-gray-300'
            onChange={(e) => setParam(e.target.value)}
          />
        )}

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

export default FilterCard;
