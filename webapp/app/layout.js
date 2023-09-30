import { FileContextProvider } from '@/context/csv.context';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CSV Importer',
  description: 'Made by Karan Dua',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{ margin: 'auto', maxWidth: '80rem', padding: '2rem' }}
      >
        <FileContextProvider>{children}</FileContextProvider>
      </body>
    </html>
  );
}
