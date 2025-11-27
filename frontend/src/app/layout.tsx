import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: allow importing global css without type declarations
import "../styles/globals.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindLink",
  description: "AI Personalized Learning Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}