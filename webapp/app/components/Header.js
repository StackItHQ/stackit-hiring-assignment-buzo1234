'use client';

import React, { useContext } from 'react';
import ProgressBar from './ProgressBar';
import { StepContext } from '@/context/step.context';
import Image from 'next/image';

function Header() {
  const { stepState } = useContext(StepContext);
  return (
    <div className='flex w-full px-4 justify-between mb-10'>
      <div className='flex space-x-3 items-center'>
        <Image
          src='/stackit.png'
          width={45}
          height={45}
          className='object-contain'
        />
        <p>Stackit Assignment</p>
      </div>

      <ProgressBar lastComplete={Number(stepState.step)} />
    </div>
  );
}

export default Header;
