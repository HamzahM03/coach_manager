// app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css"



const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // choose what you need
  display: 'swap'

})

export const metadata: Metadata = {
  title: "App",
  description: "Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
