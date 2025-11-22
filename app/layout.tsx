import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Rohin Patel - iOS Engineer & AI Developer",
  description: "Northeastern CS student specializing in iOS development and AI. Currently iOS Engineer at WHOOP. Building health tech, ML systems, and mobile apps.",
  keywords: ["Rohin Patel", "iOS Engineer", "SwiftUI", "AI", "Machine Learning", "WHOOP", "Northeastern", "Software Engineer", "Computer Vision"],
  authors: [{ name: "Rohin Patel" }],
  openGraph: {
    title: "Rohin Patel - iOS Engineer & AI Developer",
    description: "Northeastern CS student | iOS Engineer at WHOOP | Building health tech and ML systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {/* Global navigation */}
        <Navigation />
        
        {children}
      </body>
    </html>
  );
}

