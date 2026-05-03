import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s - Todo List',
    default: 'Todo List',
  },
  description: 'Your simple and elegant Todo List.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-[var(--font-inter)] bg-[#FBE8CE] text-neutral-800 antialiased">
        {children}
      </body>
    </html>
  );
}
