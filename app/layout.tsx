import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StorySprout — Animated Children's Storybook",
  description: "Read a little. Imagine a lot. An interactive storybook adventure with Pip the little fox for children aged 3–7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full font-nunito bg-[#FFF7E8] text-[#63452E] selection:bg-[#F5D778] selection:text-[#63452E]">
        {children}
      </body>
    </html>
  );
}
