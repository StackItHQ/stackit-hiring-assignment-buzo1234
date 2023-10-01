'use client';

import { FileContext } from '@/context/csv.context';
import { useContext } from 'react';
import FilterCard from './FilterCard';
import { FilterContext } from '@/context/filter.context';
import ConditionCard from './ConditionCard';

function FilterSelector() {
  const { state } = useContext(FileContext);
  const { filterState } = useContext(FilterContext);

  if (state.tableRows.length < 1) {
    return <></>;
  }

  return (
    <div className='m-4'>
      <h2 className=' text-zinc-800 font-semibold'>Add Filters</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {filterState?.conditions.map((filter, i) => {
          return <ConditionCard key={i} filter={filter} />;
        })}
        <FilterCard headers={state.tableRows} />
      </div>
    </div>
  );
}

export default FilterSelector;
