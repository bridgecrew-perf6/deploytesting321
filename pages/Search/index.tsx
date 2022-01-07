import React, { useEffect, useState } from "react";

import { useLazyQuery, useQuery } from "@apollo/client";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { SitePageContainer } from "../../components/layout";
import {
  SearchBtns,
  SearchWindow,
} from "../../components/pageComponents/Search";
import { SrchCustomBtn } from "../../components/appTypes/appType";
import { convertFirstCharacterToUppercase } from "../../components/formFuncs/miscFuncs";
import { getStoredSearch } from "../../components/globalFuncs";
import { useRouter } from "next/router";
import Layout from "_components/layout/Layout";
import { Box, Flex } from "@chakra-ui/layout";

const { SEARCH_ALL } = GraphResolvers.queries;

export default function Search() {
  const router = useRouter();

  const storedVal = getStoredSearch();

  //API
  const [searchAll, { data }] = useLazyQuery(SEARCH_ALL, {
    onCompleted: (res) => getBtnData(res.searchAll),
    fetchPolicy: "network-only",
  });

  //State Management
  const [btns, updateBtns] = useState<SrchCustomBtn[]>([]);
  const [searchValue, updateSearchValue] = useState(storedVal);

  useEffect(() => {
    if (router.query.searchVal) {
      updateSearchValue(router.query.searchVal);
    }

    localStorage.setItem(
      "PoldIt-data",
      JSON.stringify({ searchVal: searchValue })
    );

    searchAll({ variables: { searchVal: searchValue } });
  }, [router.query, searchValue]);

  //Functions
  const updateBtnItems = (btnName: string, prop: string, val: any) => {
    const updatedBtns = btns.map((item: any) => {
      if (item.btnName === btnName) {
        return { ...item, active: true };
      }

      return { ...item, active: false };
    });

    updateBtns(updatedBtns);
  };

  const getBtnData = (data: any) => {
    let btnsList: SrchCustomBtn[] = [];

    for (const key in data) {
      if (key !== "__typename") {
        const keyData = data[key][key];
        btnsList.push({
          active: false,
          btnName:
            key === "question"
              ? "Polls"
              : `${convertFirstCharacterToUppercase(key)}s`,
          count: data[key].count,
          data: keyData,
        });
      }
    }

    btnsList[0].active = true;
    updateBtns(btnsList);
  };

  return (
    <Layout pageTitle={"Search Results"}>
      <Box pt="4">
        <SearchBtns data={btns} update={updateBtnItems} />
        <Flex justify="center">
          <Box
            flex={{ base: "0 0 100%", lg: "0 0 70%" }}
            maxW={{ base: "100%", lg: "70%" }}
          >
            <SearchWindow data={btns.find((btn: any) => btn.active)} />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );

  // return (
  //   <SitePageContainer title="Search Results">
  //     <div style={{ marginTop: "100px" }}>
  //       <SearchBtns data={btns} update={updateBtnItems} />
  //       <div className="d-flex justify-content-center">
  //         <SearchWindow data={btns.find((btn: any) => btn.active)} />
  //       </div>
  //     </div>
  //   </SitePageContainer>
  // );
}
