import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  ApolloLink,
  OperationVariables,
  split,
  HttpLink,
  InMemoryCacheConfig,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";

import { getMainDefinition } from "@apollo/client/utilities";
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

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://localhost:3000/api/graphql",
      // uri: "ws://192.168.1.151:3000/api/graphql",
      options: {
        reconnect: true,
        // lazy: true,
      },
    })
  : null;
const httpLink = new HttpLink({
    uri: "http://localhost:3000/api/graphql",
  // uri: "http://192.168.1.151:3000/api/graphql",
  // uri: "http://localhost:3000/api/graphql",
  credentials: "include",
});

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    // response && response.errors == null
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

const authLink = setContext((request, previousContext) => {
  return {
    headers: {
      ...previousContext.headers,
      cookie: appCookie ? appCookie : "",
      authorization: appToken ? `Bearer ${appToken}` : "",
    },
  };
});

const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        messagesByPoll: {
          merge: false,
        },
        answersByPoll: {
          merge: false,
        },
      },
    },
    Answer: {
      fields: {
        likes: {
          merge: false,
        },
        dislikes: {
          merge: false,
        },
      },
    },
    User: {
      fields: {
        following: {
          merge: false,
        },
      },
    },
    PollQuestion: {
      fields: {
        creationDate: {
          merge: false,
        },
      },
    },
  },
};

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authLink, errorLink, splitLink]),
    cache: new InMemoryCache(cacheOptions),
  });
}

export function initializeApollo(initialState: any = null) {
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
