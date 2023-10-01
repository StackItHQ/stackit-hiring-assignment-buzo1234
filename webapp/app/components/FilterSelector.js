'use client';

import { FileContext } from '@/context/csv.context';
import { useContext } from 'react';
import FilterCard from './FilterCard';
import { FilterContext } from '@/context/filter.context';
import ConditionCard from './ConditionCard';
import { StepContext } from '@/context/step.context';
import { useRouter } from 'next/navigation';
import SortCard from './SortCard';
import SortSpecCard from './SortSpecCard';

function FilterSelector() {
  const { state } = useContext(FileContext);
  const { filterState } = useContext(FilterContext);
  const { stepDispatch } = useContext(StepContext);
  const router = useRouter();

  const handleClick = () => {
    stepDispatch({
      type: 'INCREMENT_STEP',
      payload: 2,
    });
    router.push('/connect');
  };

  if (state.tableRows.length < 1) {
    return <></>;
  }

  return (
    <div className='m-4 mt-10'>
      <h2 className=' text-zinc-800 font-semibold mb-2'>
        Add Sorting to table
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-10'>
        {filterState?.sortSpecs.map((filter, i) => {
          return <SortSpecCard key={i} filter={filter} />;
        })}
        <SortCard headers={state.tableRows} />
      </div>

      <h2 className=' text-zinc-800 font-semibold mb-2'>Add Filters</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
        {filterState?.conditions.map((filter, i) => {
          return <ConditionCard key={i} filter={filter} />;
        })}
        <FilterCard headers={state.tableRows} />
      </div>

      <div className='flex w-full mt-10 justify-end '>
        <button
          onClick={handleClick}
          className={
            filterState.conditions.length > 0 ||
            filterState.sortSpecs.length > 0
              ? 'bg-blue-500 px-4 py-2 text-white font-medium rounded-lg'
              : 'border-blue-500 border-2  px-4 py-2 text-black font-medium rounded-lg'
          }
        >
          {filterState.conditions.length > 0 || filterState.sortSpecs.length > 0
            ? 'Next'
            : 'Skip'}
        </button>
      </div>
    </div>
  );
}

export default FilterSelector;
