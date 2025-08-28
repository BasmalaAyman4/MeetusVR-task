import type { Metadata } from 'next';
import { ABeeZee } from 'next/font/google';
import './globals.css';

const abeezee = ABeeZee({
  weight: '400', 
  subsets: ['latin'], 
  display: 'swap', 
})
export const metadata: Metadata = {
  title: 'MeetusVR Login',
  description: 'Step into our shopping metaverse for an unforgettable shopping experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={abeezee.className} cz-shortcut-listen="true">{children}</body>
    </html>
  );
}