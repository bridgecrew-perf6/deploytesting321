import WithCustomStyles from "../components/layout/CompStyles";
import "./global.css";
import React, { useEffect, useState } from "react";
import AuthProvider, { useAuth } from "../components/authProvider/authProvider";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AppProps } from "next/app";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as gtag from "../lib/gtag";
import { AiOutlineArrowUp } from "react-icons/ai";
import Script from "next/script";
import configs from "../endpoints.config";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const client = useApollo(pageProps.initialApolloState);
  const [isVisible, setIsVisible] = useState(false);
  const theme = extendTheme({
    colors: {
      poldit: {
        100: "#ff4d00",
      },
    },
  });

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on(`routeChangeComplete`, handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <WithCustomStyles>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            {isVisible && (
              <Box position="fixed" bottom="30px" right="30px" cursor="pointer">
                <Box onClick={scrollToTop} bg="white" p="2" boxShadow="lg">
                  <AiOutlineArrowUp size="24" color="#ff4d00" />
                </Box>
              </Box>
            )}
          </ChakraProvider>
        </ApolloProvider>
      </WithCustomStyles>
    </AuthProvider>
  );
}

export default MyApp;
