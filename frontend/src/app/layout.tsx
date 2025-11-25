import type { Metadata } from "next";
// @ts-ignore: allow importing global css without type declarations
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MindLink",
  description: "AI-Powered Personal Knowledge Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
