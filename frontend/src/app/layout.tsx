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

// import React from "react";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// // Assuming your globals.css is in src/styles/ based on your snippet. 
// // If it is in src/app/, change this to: import "./globals.css";
// // @ts-ignore: allow importing global css without type declarations
// import "../styles/globals.css"; 

// import GSAPWrapper from "@/components/GSAPWrapper";

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
//       <body className={inter.className}>
//         <GSAPWrapper>
//           {children}
//         </GSAPWrapper>
//       </body>
//     </html>
//   );
// }

// import React from "react";
// import type { Metadata, Viewport } from "next";
// import { Inter, JetBrains_Mono } from "next/font/google";
// // @ts-ignore: allow importing global css without type declarations
// import "../styles/globals.css";

// import GSAPWrapper from "@/components/GSAPWrapper";

// // Load Inter for UI and JetBrains Mono for code/technical elements
// const inter = Inter({ 
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const mono = JetBrains_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     template: "%s | MindLink AI",
//     default: "MindLink | Cognitive Learning Architecture",
//   },
//   description: "Advanced Retrieval-Augmented Generation (RAG) learning system powered by Gemini 3 Pro.",
//   keywords: ["AI", "Education", "RAG", "Gemini", "DeepMind", "Hackathon"],
//   authors: [{ name: "MindLink Team" }],
// };

// export const viewport: Viewport = {
//   themeColor: "#020617", // Matches slate-950
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`dark ${inter.variable} ${mono.variable}`}>
//       <body className="bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 selection:text-indigo-100 font-sans min-h-screen flex flex-col">
        
//         {/* --- GLOBAL AMBIENT BACKGROUND --- 
//             This fixed background now persists across the entire app (Landing, Dashboard, Login),
//             creating a cohesive "Deep Tech" atmosphere.
//         */}
//         <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
//            {/* Primary Glow (Top Left) */}
//            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
           
//            {/* Secondary Glow (Bottom Right) */}
//            <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
           
//            {/* Accent Glow (Center) */}
//            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[80vh] h-[40vh] bg-violet-600/10 rounded-full blur-[130px] mix-blend-screen" />
           
//            {/* Subtle Grid Overlay for "Tech" feel */}
//            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.03 }}></div>
//         </div>

//         {/* Global GSAP Wrapper for Page Transitions/Animations */}
//         <GSAPWrapper>
//           {children}
//         </GSAPWrapper>
        
//       </body>
//     </html>
//   );
// }

import React from "react";
import type { Metadata, Viewport } from "next";

// --- LOCAL SETUP: Uncomment these lines locally ---
import { Inter, JetBrains_Mono } from "next/font/google";
// import "./globals.css"; // Ensure this path points to where your globals.css actually is (e.g., ./globals.css or ../styles/globals.css)
// @ts-ignore: allow importing global css without type declarations
import "../styles/globals.css"; 
// FIXED: Use relative import for preview compatibility
import GSAPWrapper from "../components/GSAPWrapper";

// --- LOCAL SETUP: Uncomment these font definitions locally ---

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    template: "%s | MindLink AI",
    default: "MindLink | Cognitive Learning Architecture",
  },
  description: "Advanced Retrieval-Augmented Generation (RAG) learning system powered by Gemini 3 Pro.",
  keywords: ["AI", "Education", "RAG", "Gemini", "DeepMind", "Hackathon"],
  authors: [{ name: "MindLink Team" }],
};

export const viewport: Viewport = {
  themeColor: "#020617", // Matches slate-950
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // LOCALLY: Use <html lang="en" className={`dark ${inter.variable} ${mono.variable}`}>
    <html lang="en" className="dark">
      <body 
        className="bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 selection:text-indigo-100 font-sans min-h-screen flex flex-col"

      >
        
        {/* --- GLOBAL AMBIENT BACKGROUND --- */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
           {/* Primary Glow (Top Left) */}
           <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
           
           {/* Secondary Glow (Bottom Right) */}
           <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
           
           {/* Accent Glow (Center) */}
           <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[80vh] h-[40vh] bg-violet-600/10 rounded-full blur-[130px] mix-blend-screen" />
           
           {/* Subtle Grid Overlay */}
           <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.03 }}></div>
        </div>

        {/* Global GSAP Wrapper */}
        <GSAPWrapper>
          {children}
        </GSAPWrapper>
        
      </body>
    </html>
  );
}