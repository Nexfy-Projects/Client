// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// // コンテキストの型定義
// interface TokenContextType {
//   token: string | null;
//   setToken: (token: string | null) => void;
// }

// // コンテキストの初期値
// const initialTokenContext: TokenContextType = {
//   token: null,
//   setToken: () => {}
// };

// // コンテキスト作成
// export const TokenContext = createContext<TokenContextType | undefined>(undefined);

// // useTokenフック
// export const useToken = () => {
//   const context = useContext(TokenContext);
//   if (context === undefined) {
//     throw new Error('useToken must be used within a TokenProvider');
//   }
//   return context;
// };

// // 明示的なsetToken関数を提供
// export const useSetToken = () => {
//   const context = useContext(TokenContext);
//   if (context === undefined) {
//     throw new Error('useSetToken must be used within a TokenProvider');
//   }
//   // setToken関数を直接返す
//   return context.setToken;
// };

// export const TokenProvider = ({ children }: { children: ReactNode }) => {
//   初期化時に localStorage からトークンを取得
//   const [token, setTokenState] = useState<string | null>(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('spotify_access_token');
//     }
//     return null;
//   });

//   トークンを設定するときに localStorage も更新
//   const setToken = (newToken: string | null) => {
//     try {
//       if (newToken) {
//         localStorage.setItem('spotify_access_token', newToken);
//         console.log('Token saved to localStorage:', newToken.substring(0, 10) + '...');
//       } else {
//         localStorage.removeItem('spotify_access_token');
//         console.log('Token removed from localStorage');
//       }
//       setTokenState(newToken);
//     } catch (error) {
//       console.error('Failed to save token to localStorage:', error);
//       setTokenState(newToken);
//     }
//   };

//   return (
//     <TokenContext.Provider value={{ token, setToken }}>
//       {children}
//     </TokenContext.Provider>
//   );
// };
