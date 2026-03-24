import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muyeenulislam.vercel.app"),
  title: {
    default: "Md. Muyeen Ul Islam | Full Stack Developer and Software Engineer",
    template: "%s | Md. Muyeen Ul Islam",
  },
  description:
    "Portfolio of Md. Muyeen Ul Islam - frontend-focused full stack engineer building modern web products with React, Next.js, and TypeScript.",
  keywords: [
    "Md Muyeen Ul Islam",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Portfolio",
    "Frontend Engineer",
  ],
  authors: [{ name: "Md. Muyeen Ul Islam" }],
  creator: "Md. Muyeen Ul Islam",
  publisher: "Md. Muyeen Ul Islam",
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    type: "website",
    url: "/",
    title: "Md. Muyeen Ul Islam | Full Stack Developer and Software Engineer",
    description:
      "Frontend-focused full stack engineer building responsive, high-performance products with modern React ecosystems and scalable backend integrations.",
    siteName: "Md. Muyeen Ul Islam Portfolio",
    images: [
      {
        url: "/images/heroImg.png",
        width: 1200,
        height: 630,
        alt: "Md. Muyeen Ul Islam Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Muyeen Ul Islam | Full Stack Developer and Software Engineer",
    description:
      "Portfolio showcasing projects, experience, and modern full stack engineering work.",
    images: ["/images/heroImg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
