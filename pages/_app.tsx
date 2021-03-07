import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React, { useEffect } from "react";
import App from "next/app";
import AuthProvider from "../components/authProvider/authProvider";
import { ApolloProvider } from "@apollo/client";
// import { withApollo } from "../lib/apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps } from "next/app";
// import ProtectedComp from "../components/layout/ProtectedComp";

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

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, apolloClient } = this.props;

//     return (
//       <AuthProvider>
//         <WithBootStrap>
//           <ApolloProvider client={apolloClient}>
//             <Component {...pageProps} />
//           </ApolloProvider>
//         </WithBootStrap>
//       </AuthProvider>
//     );
//   }
// }

// export default withApollo(MyApp);

// function MyApp({ Component, pageProps }) {
//   const client = useApollo(pageProps.initialApolloState);

//   return (
//     <AuthProvider>
//       <ApolloProvider client={client}>
//         <WithBootStrap>
//           {/* <ProtectedComp Component={Component} pageProps={pageProps} /> */}
//           <Component {...pageProps} />
//         </WithBootStrap>
//       </ApolloProvider>
//     </AuthProvider>
//   );
// }

// export default MyApp;
