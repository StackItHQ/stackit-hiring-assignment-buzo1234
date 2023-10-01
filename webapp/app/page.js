import Image from 'next/image';
import FileLoader from './components/FileLoader';
import ShowHeaders from './components/ShowHeaders';
import FilterSelector from './components/FilterSelector';
import ImportButton from './components/ImportButton';

export default function Home() {
  return (
    <main>
      <FileLoader />
      <ShowHeaders />
      <FilterSelector />
      <ImportButton />
    </main>
  );
}
