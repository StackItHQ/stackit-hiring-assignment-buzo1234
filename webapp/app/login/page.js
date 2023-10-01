'use client';

import { StepContext } from '@/context/step.context';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

function page() {
  const params = useSearchParams();
  const router = useRouter();
  const { stepDispatch } = useContext(StepContext);
  useEffect(() => {
    const name = params.get('name');
    const photo = params.get('photo');
    const token = params.get('access_token');

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: name,
        photo: photo,
        token: token,
      })
    );

    stepDispatch({
      type: 'INCREMENT_STEP',
      payload: 0,
    });
    router.replace('/file');
  }, []);

  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <p className='text-2xl font-medium'>Loading..</p>
    </div>
  );
}

export default page;
