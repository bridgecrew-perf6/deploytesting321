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
// let apolloClient = null;
// let appToken = null;
// let appCookie = null;

// export const storeTokens = (sessionToken = "", sessionCookie = "") => {
//   console.log(sessionCookie);
//   appToken = sessionToken;
//   appCookie = sessionCookie;
//   return;
// };

// // export const storeCookie = (sessionCookie) => {
// //   appCookie = sessionCookie;
// //   return;
// // };

// // export const storeCookie = (cookie) => {
// //   sessionCookie = cookie;
// //   return;
// // };

// const siteLink = createHttpLink({
//   uri: "http://localhost:3000/api/graphql",
//   credentials: "include",
// });

// const errorLink = onError(
//   ({ graphQLErrors, networkError, response, operation }) => {
//     if (graphQLErrors) {
//       graphQLErrors.map(({ message, locations, path }) => {
//         // if (message === "Not Authenticated.  Please Log In!") {
//         //   response.errors = null;
//         //   // console.log(response.errors[0].message);
//         // }

//         // console.log(
//         //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         // );
//       });
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }
//   }
// );

// const authLink = setContext((_, { headers }) => {
//   // console.log("Current Token in middleware: ", appToken);
//   return {
//     headers: {
//       ...headers,
//       cookie: appCookie ? appCookie : "",
//       authorization: appToken ? `Bearer ${appToken}` : "",
//     },
//   };
// });

// function createApolloClient() {
//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     link: errorLink.concat(authLink.concat(siteLink)),
//     cache: new InMemoryCache(),
//   });
// }

// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   if (initialState) {
//     // get existing cache, loaded during client side data
//     const existingCache = _apolloClient.extract();
//     //restore cache using the data passed from getStaticProps/getServerSideProps combined with existing cache data
//     _apolloClient.cache.restore({ ...existingCache, ...initialState });
//   }

//   //For SSG and SSR always create a new Apollo Client
//   if (typeof window === "undefined") return _apolloClient;

//   //Create Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient;
//   return _apolloClient;
// }

// export function useApollo(initialState) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }

// // export const apiQuery = async (gqlString) => {
// //   const response = await client.query({
// //     query: queryString,
// //   });

// //   console.log(response);
// // };

// // export const apiMutation = async (gqlString, variables) => {
// //   const response = await client.mutate({
// //     mutation: gqlString,
// //     variables,
// //   });

// //   return response;
// // };
