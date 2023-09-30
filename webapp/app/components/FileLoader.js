'use client';

import { Progress } from '@/components/ui/progress';
import { useCallback, useContext, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Cloud, File, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { FileContext } from '@/context/csv.context';

function FileLoader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { state, dispatch } = useContext(FileContext);

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
    }, 500);

    return interval;
  };

  function parseCSV(file) {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(
            Object.keys(d).map((x) => {
              return { name: x, selected: true };
            })
          );
          valuesArray.push(Object.values(d));
        });

        dispatch({
          type: 'INSERT_ALL_DATA',
          payload: {
            fileName: file.name,
            tableRows: rowsArray[0],
            values: valuesArray,
            parsedData: results.data,
          },
        });
      },
    });
  }

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          setIsUploading(true);

          const progressInterval = startSimulatedProgress();
          parseCSV(acceptedFile[0]);
          console.log(state?.fileName);

          clearInterval(progressInterval);
          setUploadProgress(100);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'
          >
            <div className='flex items-center justify-center h-full w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  {/* <Cloud className='h-6 w-6 text-zinc-500 mb-2' /> */}
                  <p className='mb-2 text-sm text-zinc-700'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                </div>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                    <div className='px-3 py-2 h-full grid place-items-center'>
                      <File className='h-4 w-4 text-blue-500' />
                    </div>
                    <div className='px-3 py-2 h-full text-sm truncate'>
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}

                {isUploading ? (
                  <div className='w-full mt-4 max-w-xs mx-auto'>
                    <Progress
                      indicatorColor={
                        uploadProgress === 100 ? 'bg-green-500' : ''
                      }
                      value={uploadProgress}
                      className='h-1 w-full bg-zinc-200'
                    />
                    {uploadProgress === 100 ? (
                      <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                        {/* <Loader2 className='h-3 w-3 animate-spin' /> */}
                        File read successfully!
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <input
                  {...getInputProps()}
                  type='file'
                  id='dropzone-file'
                  className='hidden'
                />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FileLoader;
