import type { Metadata } from "next";
import { DM_Sans, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const headingFont = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const accentFont = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/spn_Logo.jpg", apple: "/spn_Logo.jpg" },
  title: "Shwe Pyi Nyein International | People First. Possibilities Always.",
  description:
    "A Ministry of Labour-licensed overseas employment agency in Myanmar since 2000. Responsible recruitment, trusted partnerships, and opportunities across borders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${accentFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
