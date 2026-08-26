import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import SignupGate from "@/components/SignupGate";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dronahub",
  description: "Academic resources for students",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", manrope.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-[var(--font-manrope)]">
        <SignupGate />
        {children}
        
      </body>
    </html>
  );
}