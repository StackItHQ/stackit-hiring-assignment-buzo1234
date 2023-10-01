'use client';

import React, { useContext } from 'react';
import ProgressBar from './ProgressBar';
import { StepContext } from '@/context/step.context';

function Header() {
  const { stepState } = useContext(StepContext);
  return (
    <div className='flex w-full m-4 px-4 justify-center mb-10'>
      <ProgressBar lastComplete={Number(stepState.step)} />
    </div>
  );
}

export default Header;
