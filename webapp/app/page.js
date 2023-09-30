import Image from 'next/image';
import FileLoader from './components/FileLoader';
import ShowHeaders from './components/ShowHeaders';
import FilterSelector from './components/FilterSelector';

export default function Home() {
  return (
    <main>
      <FileLoader />
      <ShowHeaders />
      <FilterSelector />
    </main>
  );
}
