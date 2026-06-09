import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FrontendFlow",
  description: "AI Chatbot that generates ReactTS and tailwind components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased bg-zinc-50`}
    >
      <body className="h-screen flex flex-col overflow-y-auto bg-zinc-50">
        {children}
      </body>
    </html>
  );
}
