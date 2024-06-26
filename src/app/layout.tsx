import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "~/app/_components/Navbar";

import { TRPCReactProvider } from "~/trpc/react";
import { NextAuthProvider } from "./_components/NextAuthProvider";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dev Inspire",
  description: "Get inspired with new ideas for your next project!",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <NextAuthProvider>
            <Analytics />
            <Navbar />
            {children}
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
