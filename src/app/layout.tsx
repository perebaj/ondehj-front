import "./globals.css";

import type { Metadata } from "next";
import { McLaren as Font } from "next/font/google";

import { cn } from "@/lib/utils";

const McLaren = Font({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Onde Hoje?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"> */}
        {children}
        {/* </div>
        </div> */}
      </body>
    </html>
  );
}
