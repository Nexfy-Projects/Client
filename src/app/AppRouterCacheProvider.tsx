import React, { createContext, useContext, useState } from "react";

interface AppRouterCacheContextType {
  cache: Record<string, unknown>;
  updateCache: (key: string, value: unknown) => void;
}

const AppRouterCacheContext = createContext<
  AppRouterCacheContextType | undefined
>(undefined);

export const AppRouterCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cache, setCache] = useState({});

  const updateCache = (key: string, value: unknown) => {
    setCache((prevCache) => ({
      ...prevCache,
      [key]: value,
    }));
  };

  return (
    <AppRouterCacheContext.Provider value={{ cache, updateCache }}>
      {children}
    </AppRouterCacheContext.Provider>
  );
};

export const useAppRouterCache = () => {
  return useContext(AppRouterCacheContext);
};
