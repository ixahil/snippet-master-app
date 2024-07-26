import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/services/redux/redux-provider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Snippet Master",
  description:
    "Snippet Master is an application where users can log in, save notes with code snippets, and organize them efficiently for later retrieval.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider enableSystem={false} attribute="class">
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
