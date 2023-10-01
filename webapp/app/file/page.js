'use client';

import FileLoader from '../components/FileLoader';
import ShowHeaders from '../components/ShowHeaders';

function page() {
  return (
    <main>
      <FileLoader />
      <ShowHeaders />
    </main>
  );
}

export default page;
