import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954", // Spotify green
    },
    secondary: {
      main: "#1ED760",
    },
    background: {
      default: "#121212",
      paper: "#181818",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: '"Circular", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#181818",
          borderRadius: 8,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          padding: "0 24px",
          "@media (min-width: 600px)": {
            minHeight: 64,
          },
        },
      },
    },
  },
  transitions: {
    create: (props = ["all"], options = {}) => {
      const {
        duration = 300,
        easing = "cubic-bezier(0.4, 0, 0.2, 1)",
        delay = 0,
      } = options;

      return (Array.isArray(props) ? props : [props])
        .map((prop: string) => `${prop} ${duration}ms ${easing} ${delay}ms`)
        .join(",");
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});

export default theme;
