// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// // @ts-ignore: allow importing global css without type declarations
// import "../styles/globals.css"; 

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "MindLink",
//   description: "AI Personalized Learning Companion",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Assuming your globals.css is in src/styles/ based on your snippet. 
// If it is in src/app/, change this to: import "./globals.css";
// @ts-ignore: allow importing global css without type declarations
import "../styles/globals.css"; 

import GSAPWrapper from "@/components/GSAPWrapper";

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
      <body className={inter.className}>
        <GSAPWrapper>
          {children}
        </GSAPWrapper>
      </body>
    </html>
  );
}