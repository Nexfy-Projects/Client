// 'use client';
// import React, { createContext, ReactNode, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useToken } from '@/utils/context/tokenContext';

// interface tokenContextType {
//   accessToken: string | null;
//   setAccessToken: (accessToken: string | null) => void;
//   refreshToken: string | null;
//   setRefreshToken: (refreshToken: string | null) => void;
// }

// export const TokenContext = createContext<tokenContextType | undefined>(
//   {} as tokenContextType,
// );

// const SPOTIFY_SCOPES = [
//   'playlist-modify-public',
//   'playlist-modify-private',
//   'playlist-read-private',
//   'playlist-read-collaborative',
//   'user-read-private',
//   'user-read-email',
// ].join(' ');

// export const getSpotifyAuthUrl = () => {
//   const params = new URLSearchParams({
//     client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
//     response_type: 'code',
//     redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
//     scope: SPOTIFY_SCOPES,
//     show_dialog: 'true',
//   });

//   return `https://accounts.spotify.com/authorize?${params.toString()}`;
// };

// export const TokenProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const { token, setToken } = useToken();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     // URLから認証コードを取得
//     if (typeof window !== 'undefined') {
//       try {
//         const url = new URL(window.location.href);
//         const code = url.searchParams.get('code');

//         if (code && !token) {
//           // コードが存在し、トークンがない場合はトークン交換
//           console.log('Authorization code found, exchanging for token...');
//           fetchTokenWithCode(code)
//             .then((accessToken) => {
//               if (accessToken) {
//                 console.log('Setting access token from code');
//                 setToken(accessToken);

//                 // クエリパラメータのないURLにリダイレクト
//                 router.replace(pathname || '/');
//               }
//             })
//             .catch((error) => {
//               console.error('Failed to exchange code for token:', error);
//             });
//         } else if (!token) {
//           // トークンがない場合は localStorage をチェック
//           const storedToken = localStorage.getItem('spotify_access_token');
//           if (storedToken) {
//             console.log('Setting token from localStorage');
//             setToken(storedToken);
//             validateToken(storedToken).catch(() => {
//               // トークンが無効な場合は削除
//               setToken(null);
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Error processing authentication:', error);
//       }
//     }
//   }, [pathname, router, setToken, token]);

//   // トークンの検証
//   const validateToken = async (accessToken: string) => {
//     try {
//       const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Invalid token');
//       }

//       return true;
//     } catch (error) {
//       console.error('Token validation failed:', error);
//       throw error;
//     }
//   };

//   // 認証コードをトークンに交換
//   const fetchTokenWithCode = async (code: string) => {
//     try {
//       const response = await fetch('/api/spotify/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to exchange code for token');
//       }

//       const data = await response.json();
//       return data.access_token;
//     } catch (error) {
//       console.error('Error exchanging code for token:', error);
//       throw error;
//     }
//   };

//   return <>{children}</>;
// };
