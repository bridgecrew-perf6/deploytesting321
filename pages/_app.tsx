import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React, { useEffect } from "react";
import App from "next/app";
import AuthProvider from "../components/authProvider/authProvider";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps } from "next/app";

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
