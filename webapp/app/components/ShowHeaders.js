'use client';

import { FileContext } from '@/context/csv.context';
import React, { useContext } from 'react';
import HeaderSelector from './HeaderSelector';
import { useRouter } from 'next/navigation';
import { StepContext } from '@/context/step.context';

function ShowHeaders() {
  const { state } = useContext(FileContext);
  const { stepDispatch } = useContext(StepContext);
  const router = useRouter();
  const handleClick = () => {
    stepDispatch({
      type: 'INCREMENT_STEP',
      payload: 1,
    });
    router.push('/filters');
  };
  return (
    <div className='m-4 mt-10'>
      {state && state.tableRows?.length > 0 && (
        <>
          <div>
            <h2 className=' text-zinc-800 font-semibold'>
              Please select the headers to include:
            </h2>
            {state.tableRows.map((header, i) => {
              return <HeaderSelector key={i} header={header} id={i} />;
            })}
          </div>

          <div className='flex w-full mt-10 justify-end '>
            <button
              onClick={handleClick}
              className='bg-blue-500 px-4 py-2 text-white font-medium rounded-lg'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowHeaders;
