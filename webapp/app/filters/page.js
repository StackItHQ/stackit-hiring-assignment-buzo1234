'use client';

import React, { useContext, useEffect, useState } from 'react';
import FilterSelector from '../components/FilterSelector';
import { FileContext } from '@/context/csv.context';
import { useRouter } from 'next/navigation';

function page() {
  const { state } = useContext(FileContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (state?.tableRows.length > 0) setLoading(false);
    else {
      router.replace('/');
    }
  }, [state]);
  return (
    <div>
      {loading ? (
        <div className='flex w-full h-screen items-center justify-center'>
          <p className='text-2xl font-medium'>Loading...</p>
        </div>
      ) : (
        <FilterSelector />
      )}
    </div>
  );
}

export default page;
