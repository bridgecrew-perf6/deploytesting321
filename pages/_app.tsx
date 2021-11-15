import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React, { useEffect } from "react";
import AuthProvider, { useAuth } from "../components/authProvider/authProvider";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const theme = extendTheme({
    colors: {
      poldit: {
        100: "#ff4d00",
      },
    },
  });

  return (
    <AuthProvider>
      <WithCustomStyles>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </WithCustomStyles>
    </AuthProvider>
  );
}

export default MyApp;
