import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/sonner";
import LenisProvider from "@/components/LenisProvider";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resuma - AI Resume Builder",
  description: "Create your professional resume in minutes with Resuma, the AI-powered resume builder. Generate tailored resumes effortlessly and land your dream job.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="beforeInteractive"
  />
          <Navbar />
          {/* <LenisProvider> */}
            {children}
          {/* </LenisProvider> */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
