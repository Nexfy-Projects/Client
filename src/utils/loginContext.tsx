"use client";

import { createContext, useState, ReactNode } from "react";

interface RedirectContextType {
  redirected: boolean;
  setRedirected: (redirected: boolean) => void;
  toggleRedirected: () => void; //真偽値斑点
}

export const RedirectContext = createContext<RedirectContextType | undefined>(
  {} as RedirectContextType,
);

export const RedirectProvider = ({ children }: { children: ReactNode }) => {
  const [redirected, setRedirected] = useState(false);

  // 真偽値を反転させる関数
  const toggleRedirected = () => {
    setRedirected((prev) => !prev);
  };

  return (
    <RedirectContext.Provider
      value={{ redirected, setRedirected, toggleRedirected }}
    >
      {children}
    </RedirectContext.Provider>
  );
};
