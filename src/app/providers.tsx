"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { NextUIProvider } from "@nextui-org/react";
// import { TokenProvider } from '@/utils/context/tokenContext';
// Import SetTokenProvider from the correct location or remove if not needed
import theme from "@/theme/theme";
// import { ReactNode } from 'react';

// export const TokenProvider = ({ children }: { children: ReactNode }) => {
// logic here
// return <TokenContext.Provider value={/* your token state here */}>{children}</TokenContext.Provider>;
// };

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
