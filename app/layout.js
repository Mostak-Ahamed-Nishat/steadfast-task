import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "FALCON",
  description: "A E-commerce platform for the future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased bg-background`}>
        <h1>Hello world!</h1>
        {children}
      </body>
    </html>
  );
}
