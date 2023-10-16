import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StyledEngineProvider>
  );
}
