import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React, { useEffect } from "react";
import App from "next/app";
import AuthProvider from "../components/authProvider/authProvider";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url);
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplate", handleRouteChange);
  //   };
  // }, [router.events]);

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
