import type { Metadata } from "next";
import type { ReactNode } from "react";
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
