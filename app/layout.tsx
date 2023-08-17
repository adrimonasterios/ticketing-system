import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { classNames } from "@/_utils/helpers";
import Navbar from "@@/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticketing System",
  description: "Coding Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
      <body className={classNames(inter.className)}>
        <Navbar>{children}</Navbar>
      </body>
    </html>
  );
}
