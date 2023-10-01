import { FileContextProvider } from '@/context/csv.context';
import './globals.css';
import { Inter } from 'next/font/google';
import { FilterContextProvider } from '@/context/filter.context';
import Script from 'next/script';
import Header from './components/Header';
import { StepContextProvider } from '@/context/step.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CSV Importer',
  icons: {
    icon: '/stackit.png',
  },
  description: 'Made by Karan Dua',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-[#FAF9F6]'>
      <body
        className={inter.className+" bg-[#FAF9F6]"}
        style={{ margin: 'auto', maxWidth: '50rem', padding: '2rem' }}
      >
        <FilterContextProvider>
          <FileContextProvider>
            <StepContextProvider>
              <Header />
              {children}
            </StepContextProvider>
          </FileContextProvider>
        </FilterContextProvider>
      </body>
    </html>
  );
}
