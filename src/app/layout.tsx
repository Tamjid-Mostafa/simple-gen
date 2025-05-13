import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpleGen - Your Best LinkedIn Post Generator Assistant",
  description: "A NextJS app with Clerk authentication and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GlobalStateProvider>
              <main className="">{children}</main>
            </GlobalStateProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
