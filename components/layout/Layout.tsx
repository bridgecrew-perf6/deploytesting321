import { Box } from "@chakra-ui/layout";
import React from "react";
import MyNavbar from "_components/pageComponents/Other/NavBar/MyNavbar";
import Head from "next/head";

const Layout = ({ pageTitle, children }: any) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <MyNavbar />
      <Box minH="100vh" pt="60px" bg="#f4f4f4">
        {/* <Box minH="calc(100vh - 60px)" pt="60px" bg="gray"> */}
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
