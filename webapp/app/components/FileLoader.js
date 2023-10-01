'use client';

import { Progress } from '@/components/ui/progress';
import { useCallback, useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Cloud, File, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { FileContext } from '@/context/csv.context';
import { FilterContext } from '@/context/filter.context';

let interval = undefined;

function FileLoader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { state, dispatch } = useContext(FileContext);
  const { filterDispatch } = useContext(FilterContext);
  const [fileProcessed, setFileProcessed] = useState(false);
  const [csvData, setCsvData] = useState('');
  useEffect(() => {
    if (isUploading) {
      console.log(isUploading);
      interval = setInterval(function () {
        console.log('here');
        if (uploadProgress < 95) {
          setUploadProgress((prev) => prev + 5);
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isUploading]);

  async function parseCSV(file) {
    if (!file) return;
    setFileProcessed(false);
    setUploadProgress(0);

    // Event listener on reader when the file
    // loads, we parse it and set the data.

    Papa.parse(file, {
      header: true,
      preview: 1,
      step: function (results, parser) {
        const columns = Object.keys(results.data).map((x, i) => {
          return { id: i, name: x, selected: true };
        });
        dispatch({
          type: 'INSERT_ALL_DATA',
          payload: {
            fileName: file.name,
            tableRows: columns,
          },
        });
        parser.abort();
      },
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      setCsvData(contents);
      dispatch({
        type: 'INSERT_CSV_STRING',
        payload: contents,
      });

      filterDispatch({
        type: 'RESET',
      });

      setFileProcessed(true);
      setUploadProgress(100);
      setIsUploading(false);
    };

    reader.readAsText(file);

    //console.log('data', data);
  }

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          setIsUploading(true);
          //const progressInterval = startSimulatedProgress();
          parseCSV(acceptedFile[0]);
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
                    drag and drop (.csv)
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
