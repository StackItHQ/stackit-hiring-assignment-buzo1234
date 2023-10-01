import { FilterContext } from '@/context/filter.context';
import React, { useContext } from 'react';
import { X } from 'lucide-react';

function ConditionCard({ filter }) {
  const { filterDispatch } = useContext(FilterContext);

  function remove() {
    filterDispatch({
      type: 'REMOVE_CONDITION',
      payload: {
        columnName: filter.columnName,
        conditionType: filter.conditionType,
        param: filter.param,
      },
    });
  }

  return (
    <div className='bg-zinc-100 rounded-md text-zinc-700 p-3 relative'>
      <div
        onClick={remove}
        className='absolute -top-4 -right-2 p-2 cursor-pointer rounded-md hover:bg-gray-300 bg-gray-200'
      >
        <X />
      </div>
      <div className='flex items-center justify-start border-zinc-500 border-l-2'>
        <div className='w-4 mr-2 h-[2px] bg-zinc-500'></div>
        <p className='font-medium'>{filter.columnName}</p>
      </div>
      <div className='flex items-center justify-start border-zinc-500 border-l-2'>
        <div className='w-4 mr-2 h-[2px] bg-zinc-500'></div>
        <p>{filter.conditionType}</p>
      </div>
      <div className='flex items-center justify-start border-zinc-500 border-l-2'>
        <div className='w-4 mr-2 h-[2px] bg-zinc-500'></div>
        <p>{filter.param}</p>
      </div>
    </div>
  );
}

export default ConditionCard;
