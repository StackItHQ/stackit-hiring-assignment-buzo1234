'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBarCircle from './ProgressBarCircle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mappings = {
  0: '/',
  1: '/file',
  2: '/filters',
  3: '/connect',
};

function ProgressBar({ lastComplete }) {
  const [step, setStep] = useState(0);
  const path = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    switch (path) {
      case '/':
        setStep(0);
        return;
      case '/file':
        setStep(1);
        return;
      case '/filters':
        setStep(2);
        return;
      case '/connect':
        setStep(3);
        return;
      default:
        setStep(0);
        return;
    }
  }, [path]);
  /* Maximum 3 steps */

  function handleClick(i) {
    if (i >= lastComplete + 2) {
      return;
    }
    navigate.push(mappings[i]);
  }

  return (
    <div>
      <div className='flex w-fit space-x-4'>
        {Array.from(Array(4)).map((_, i) => {
          return (
            <div key={i} onClick={() => handleClick(i)}>
              <ProgressBarCircle
                key={i}
                step={step}
                disabled={i >= lastComplete + 2 ? true : false}
                completed={i <= lastComplete ? true : false}
                active={step === i ? true : false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
