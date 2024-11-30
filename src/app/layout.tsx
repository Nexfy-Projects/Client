import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Header } from "./_components/Header";
import { Box, UIProvider } from "@yamada-ui/react";
// import { Sidebar } from "./_components/Sidebar";
// import { Footer } from "./_components/Footer";
import { RedirectProvider } from "@/utils/loginContext";
import { TokenProvider } from "@/utils/tokenProvider";
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth";

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
  // pageProps,
}: {
  children: React.ReactNode;
  // pageProps: { session: Session | null } | undefined;
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        color="white"
      >
        {/* <SessionProvider session={pageProps?.session}> */}
        <TokenProvider>
          <RedirectProvider>
            <AppRouterCacheProvider>
              <UIProvider>
                <Header />
                {/* <Sidebar /> */}
                <Box as="main" p={4}>
                  {children}
                </Box>
                {/* <Footer /> */}
              </UIProvider>
            </AppRouterCacheProvider>
          </RedirectProvider>
        </TokenProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
