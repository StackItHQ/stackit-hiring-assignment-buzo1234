'use client';

import { FileContext } from '@/context/csv.context';
import { useContext } from 'react';

function HeaderSelector({ header, id }) {
  const { dispatch, state } = useContext(FileContext);
  return (
    <div className='flex w-full'>
      <div className='flex gap-2 my-1 items-center'>
        <input
          onClick={() =>
            dispatch({
              type: 'CHANGE_SELECTED_HEADER',
              payload: {
                id: id,
                value: !header.selected,
              },
            })
          }
          type='checkbox'
          value={header.selected}
          id={id}
          className={
            header.selected
              ? 'appearance-none w-4 h-4 border-2 border-black bg-green-500'
              : 'appearance-none w-4 h-4 border-2 border-black bg-white'
          }
        />
        <label className='flex-1' htmlFor={id}>
          {header.name}
        </label>
      </div>
    </div>
  );
}

export default HeaderSelector;
