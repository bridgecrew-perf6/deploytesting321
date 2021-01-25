import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import cookie from "cookie";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import jwtDecode from "jwt-decode";
// import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { getAccessToken, setAccessToken } from "../acessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { ApolloLink } from "apollo-link";

//Determines if action is taking place on browser(client) or server
const isServer = () => typeof window === "undefined";

//HOC wrapper function on page componenets to init apolloclient
export function withApollo(PageComponent, { ssr = true } = {}) {
  //HOC wrapper
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }

    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;

      let serverAccessToken = "";

      if (isServer()) {
        const cookies = cookie.parse(req.headers.cookie);
        if (cookies.session) {
          const response = await fetch(
            "http://localhost:3000/api/refresh_token",
            {
              method: "POST",
              credentials: "include",
              headers: {
                cookie: "session=" + cookies.session,
              },
            }
          );

          const data = await response.json();
          serverAccessToken = data.getAccessToken;
        }
      }

      //Run all GraphQL queries in the component tree and extract resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      //Only on the server
      if (typeof window === "undefined") {
        //When redirecting, the response is finished, no need to render page further
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            //Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree pageProps={{ ...pageProps, apolloClient }} />
            );
          } catch (err) {
            //Prevent Apollo Client GraphQL errors from crashing SSR.  Handle them in componnnets via data.error.prop
            console.error("Error while running `getDataFromTree`", err);
          }
        }

        //getDataFromTree does not call componentWillUnmount
        //Head side effect therefore needs to be cleared manually
        Head.rewind();
      }

      //Extract query data from Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }
  return WithApollo;
}

let apolloClient = null;

//Always create a new apollo client on server.  This function creates or reuses apollo client in browser

function initApolloClient(initState, serverAccessToken) {
  //Create a new client for every server-side request so data isnt shared between connections
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  //Reuse client on client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initState);
  }
  return apolloClient;
}

function createApolloClient(initialState = {}, serverAccessToken) {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/api/graphql",
    credentials: "include",
    fetch,
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else return true;
      } catch (err) {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:3000/api/refresh_token", {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn("Refresh Token invalid.  Try to log in");
      console.error(err);
    },
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined", //Disables force fetch on server so queries only run once
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  });
}