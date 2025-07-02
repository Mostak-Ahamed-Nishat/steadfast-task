// app/layout.js or app/layout.tsx (no "use client")
import { Onest } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "FALCON",
  description: "An E-commerce platform for the future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased bg-background`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
