import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Phrase Pop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FBFBFB]`}
      >
      <MantineProvider>

        <main>

          <Navbar/>

          {children}

          <Footer/>

        </main>

      </MantineProvider>
      </body>
    </html>
  );
}
