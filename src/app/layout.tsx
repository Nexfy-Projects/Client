import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Header } from "./_components/Header";
import { Flex, Box, UIProvider } from "@yamada-ui/react";
// import { Sidebar } from "./_components/Sidebar";
import { Footer } from "./_components/Footer";
import { RedirectProvider } from "@/utils/loginContext";
import { TokenProvider } from "@/utils/tokenProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nexfy",
  description: "FInd your best music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TokenProvider>
          <RedirectProvider>
            <AppRouterCacheProvider>
              <UIProvider>
                <Header />

                <Flex height="100vh" bg="gray.900" color="white" pt="60px">
                  {/* <Sidebar /> */}
                  <Box as="main" flex="1" p={4}>
                    {children}
                  </Box>
                </Flex>
                <Footer />
              </UIProvider>
            </AppRouterCacheProvider>
          </RedirectProvider>
        </TokenProvider>
      </body>
    </html>
  );
}
