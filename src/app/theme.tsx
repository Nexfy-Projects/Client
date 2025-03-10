"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 8, // 単純な数値として定義（関数ではなく）
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          "@media (min-width:600px)": {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
  },
});

export default theme;
