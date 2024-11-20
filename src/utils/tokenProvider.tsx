"use client";
import React, { createContext, useState, ReactNode } from "react";

interface tokenContextType {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
}

export const TokenContext = createContext<tokenContextType | undefined>(
  {} as tokenContextType,
);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  return (
    <TokenContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </TokenContext.Provider>
  );
};
