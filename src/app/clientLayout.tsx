// "use client";

// import { UIProvider } from "@yamada-ui/react";
// import { AppRouterCacheProvider } from "./AppRouterCacheProvider";
// // import { RedirectProvider } from "@/utils"
// import { TokenProvider } from "@/utils/tokenProvider";
// import { SessionProvider } from "next-auth/react";
// import { Session } from "next-auth";
// import { Header } from "./_components/Header";

// interface ClientLayoutProps {
//   children: React.ReactNode;
//   pageProps: { session: Session | null } | undefined;
// }

// export default function ClientLayout({
//   children,
//   pageProps,
// }: Readonly<ClientLayoutProps>) {
//   return (
//     <SessionProvider session={pageProps?.session}>
//       <TokenProvider>
//         {/* <RedirectProvider> */}
//         <AppRouterCacheProvider>
//           <UIProvider>
//             <Header />
//             {/* <Sidebar /> */}
//             {children}
//             {/* <Footer /> */}
//           </UIProvider>
//         </AppRouterCacheProvider>
//         {/* </RedirectProvider> */}
//       </TokenProvider>
//     </SessionProvider>
//   );
// }
