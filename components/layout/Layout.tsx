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
      <Box minH="calc(100vh - 60px)" pt="60px">
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
