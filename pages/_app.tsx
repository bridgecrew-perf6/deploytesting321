import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React from "react";
import AuthProvider from "../components/authProvider/authProvider";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps } from "next/app";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <AuthProvider>
      <WithCustomStyles>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </WithCustomStyles>
    </AuthProvider>
  );
}

export default MyApp;
