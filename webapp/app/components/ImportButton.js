'use client';

import { Progress } from '@/components/ui/progress';
import { FileContext } from '@/context/csv.context';
import { FilterContext } from '@/context/filter.context';
import { Cloud, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react';

function ImportButton({ ssid, sid }) {
  const { state } = useContext(FileContext);
  const { filterState } = useContext(FilterContext);

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 2200);

    return interval;
  };

  const handleClick = async () => {
    if (state?.csvString.length < 1) return;
    const progressInterval = startSimulatedProgress();

    setLoading(true);
    fetch('/api/sheet', {
      method: 'POST',
      body: JSON.stringify({
        csvString: state?.csvString,
        headers: state?.tableRows,
        conditions: filterState?.conditions,
        sortSpecs: filterState?.sortSpecs,
        spreadSheetId: ssid,
        sheetId: sid,
        token: JSON.parse(localStorage.getItem('user')).token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('res is ', data);
        clearInterval(progressInterval);
        setUploadProgress(100);
      })
      .finally(() => setLoading(false));
  };

  if (state.tableRows.length < 1) {
    return <></>;
  }

  return (
    <div className='flex justify-center mt-10 px-4'>
      {loading ? (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/25'></div>
      ) : null}
      {loading ? (
        <div className='z-20 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:px-12 lg:px-16 '>
          <div className='flex items-center justify-center h-72 w-screen'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 '
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>Uploading CSV to Sheets</span>
                </p>
              </div>

              <div className='w-full mt-4 max-w-xs mx-auto'>
                <Progress
                  indicatorColor={uploadProgress === 100 ? 'bg-green-500' : ''}
                  value={uploadProgress}
                  className='h-1 w-full bg-zinc-200'
                />
                {uploadProgress === 100 ? (
                  <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                    <Loader2 className='h-3 w-3 animate-spin' />
                    File read successfully!
                  </div>
                ) : null}
              </div>
            </label>
          </div>
        </div>
      ) : null}

      <button
        onClick={handleClick}
        disable={loading}
        className={
          loading
            ? 'bg-zinc-300 px-4 py-3 w-full text-black font-semibold cursor-not-allowed rounded-lg'
            : 'bg-green-500 px-4 py-3 w-full text-white font-semibold rounded-lg'
        }
      >
        {loading ? 'Importing...' : 'Import'}
      </button>
    </div>
  );
}

export default ImportButton;
