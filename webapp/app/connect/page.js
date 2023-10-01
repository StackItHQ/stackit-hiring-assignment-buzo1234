'use client';

import React, { useContext, useEffect, useState } from 'react';
import { GoogleApiProvider } from 'react-gapi';
import ImportButton from '../components/ImportButton';
import { FileContext } from '@/context/csv.context';
import { useRouter } from 'next/navigation';
import SpreadsheetForm from '../components/SpreadsheetForm';
import { FilterContext } from '@/context/filter.context';

function page() {
  const router = useRouter();
  const [ssid, setSsid] = useState('');
  const [sid, setSid] = useState('');

  return (
    <div className='flex w-full flex-col'>
      <h2 className=' text-zinc-800 font-semibold m-4'>
        Enter spreadsheet details
      </h2>
      <SpreadsheetForm setSid={setSid} setSsid={setSsid} />
      {sid.length > 0 && ssid.length > 0 ? <ImportButton sid={sid} ssid={ssid} /> : null}
    </div>
  );
}

export default page;
