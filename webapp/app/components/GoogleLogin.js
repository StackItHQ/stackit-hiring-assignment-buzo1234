import React from 'react';
import { getGoogleUrl } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';

const url = getGoogleUrl();

function GoogleLogin() {
  return (
    <div className='w-full h-screen flex-col space-y-4 -mt-24 flex justify-center items-center'>
      <p>Please login to continue.</p>

      <Link
        href={url}
        className='cursor-pointer bg-white text-black font-semibold text-xl flex w-full text-center shadow-lg py-5 rounded-full justify-center items-center space-x-4'
      >
        <Image src="/google.svg" width={40} height={40} className='object-contain mr-8' />
        Login with Google
      </Link>
    </div>
  );
}

export default GoogleLogin;
