// import { Metadata } from 'next';
// import localFont from 'next/font/local';
// import './globals.css';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// import { Header } from './_components/Header';
// import { Box, UIProvider } from '@yamada-ui/react';
// import { TokenProvider } from '@/utils/tokenProvider';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme';
// import CssBaseline from '@mui/material/CssBaseline';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

// export const metadata: Metadata = {
//   title: 'NexFy',
//   description: 'Next.js で作る Spotify アプリ',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang='ja'>
//       <head>
//         {/* フォントのプリロード設定を修正 */}
//         <link
//           rel='preload'
//           href='/_next/static/media/4473ecc91f70f139-s.p.woff'
//           as='font'
//           type='font/woff'
//           crossOrigin='anonymous'
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
//         color='white'>
//         <TokenProvider>
//           <AppRouterCacheProvider>
//             <ThemeProvider theme={theme}>
//               <CssBaseline />
//               <UIProvider>
//                 <Header />
//                 <Box
//                   as='main'
//                   sx={{
//                     paddingTop: '64px', // Headerの高さ分のパディング
//                     minHeight: '100vh',
//                     bgcolor: 'background.default',
//                   }}>
//                   {children}
//                 </Box>
//               </UIProvider>
//             </ThemeProvider>
//           </AppRouterCacheProvider>
//         </TokenProvider>
//       </body>
//     </html>
//   );
// }
