"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// シンプルな型定義
interface TokenContextType {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

// デフォルト値としてdummyの関数を設定
const defaultContext: TokenContextType = {
  accessToken: null,
  setAccessToken: () => {},
};

// コンテキスト作成
const TokenContext = createContext<TokenContextType>(defaultContext);

// カスタムフック
export function useToken() {
  return useContext(TokenContext);
}

// プロバイダーコンポーネント
export function TokenProvider({ children }: { children: ReactNode }) {
  // ローカルストレージから初期値を取得（クライアントサイドのみ）
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // マウント時にローカルストレージから読み込む
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        console.log("Found token in localStorage");
        setAccessToken(storedToken);
      }
    }
  }, []);

  // トークン変更時にローカルストレージを更新
  useEffect(() => {
    if (typeof window !== "undefined" && accessToken) {
      console.log("Saving token to localStorage");
      localStorage.setItem("spotify_access_token", accessToken);
    }
  }, [accessToken]);

  // 値の提供
  const value = { accessToken, setAccessToken };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}
