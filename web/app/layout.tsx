import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./demo-guide/globals.css";

export const metadata: Metadata = {
  title: "SmartInvestor Lite",
  description:
    "AI-powered pricing advisor for micro-businesses to make fair and sustainable pricing decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Script
          src="https://js.sentry-cdn.com/93e048b6a58ff325263770268483e9fc.min.js"
          crossorigin="anonymous"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
