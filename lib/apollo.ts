import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
// import { ApolloLink } from "apollo-link";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let appToken: String | null = null;
let appCookie: String | null = null;

export const storeTokens = (
  sessionToken: String = "",
  sessionCookie: String = ""
) => {
  appToken = sessionToken;
  appCookie = sessionCookie;
  return;
};

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "include",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        // if (message === "Not Authenticated.  Please Log In!") {
        //   response.errors = null;
        //   //   // console.log(response.errors[0].message);
        // }

        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }
  }
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      cookie: appCookie ? appCookie : "",
      authorization: appToken ? `Bearer ${appToken}` : "",
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState:any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // get existing cache, loaded during client side data
    const existingCache = _apolloClient.extract();
    //restore cache using the data passed from getStaticProps/getServerSideProps combined with existing cache data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  //For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  //Create Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
