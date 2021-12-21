import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import GraphResolvers from "../lib/apollo/apiGraphStrings";
import { CustomBtn, PollHistory } from "../components/appTypes/appType";
import DataWindow from "../components/pageComponents/Home/DataWindow";
import AppLoading, {
  AppLoadingLite,
} from "../components/pageComponents/Other/Loading";
import { useAuth } from "../components/authProvider/authProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Layout from "_components/layout/Layout";
import { PollSideBar } from "_components/pageComponents/Home/PollSidebar";

const {
  NEWEST_POLLS_WITH_PAGINATION,
  ACTIVECHAT_WITH_PAGINATION,
  TRENDING_POLLS_WITH_PAGINATION,
} = GraphResolvers.queries;

interface HomeBtns extends CustomBtn {
  currentOffset: number;
  hasMoreItems: boolean;
}

const btnItems: HomeBtns[] = [
  {
    active: true,
    btnName: "Active Chats",
    data: [],
    currentOffset: 0,
    hasMoreItems: true,
  },
  {
    active: false,
    btnName: "Trending Polls",
    data: [],
    currentOffset: 0,
    hasMoreItems: true,
  },
  {
    active: false,
    btnName: "Newest Polls",
    data: [],
    currentOffset: 0,
    hasMoreItems: true,
  },
];

const Home = () => {
  //-----------------------------------------------------------------------------------------
  //Hooks
  const router = useRouter();
  const auth = useAuth();

  //-----------------------------------------------------------------------------------------
  //States
  const [itemsToBeLoadedPerFetch, setItemsToBeLoadedPerFetch] =
    useState<number>(5);
  const [homeBtns, setUpdateHomeBtns] = useState<HomeBtns[]>(btnItems);

  //-----------------------------------------------------------------------------------------
  // Queries
  const {
    data: newPollData,
    loading: newPollsLoading,
    fetchMore: newPollsFetchMore,
  } = useQuery(NEWEST_POLLS_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
  });

  const {
    data: activeChats,
    loading: activeChatsLoading,
    fetchMore: activeChatsFetchmore,
  } = useQuery(ACTIVECHAT_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
  });

  const {
    data: trendingPolls,
    loading: trendingPollsLoading,
    fetchMore: trendingPollsFetchMore,
  } = useQuery(TRENDING_POLLS_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
  });

  //-----------------------------------------------------------------------------------------
  // Functions
  const getMoreDataFor = async (btnType: string, offset: number) => {
    if (btnType === "Active Chats") {
      const { data } = await activeChatsFetchmore({
        variables: {
          offset,
          limit: itemsToBeLoadedPerFetch,
        },
      });
      return data;
    } else if (btnType === "Trending Polls") {
      const { data } = await trendingPollsFetchMore({
        variables: {
          offset,
          limit: itemsToBeLoadedPerFetch,
        },
      });
      return data;
    } else if (btnType === "Newest Polls") {
      const { data } = await newPollsFetchMore({
        variables: {
          offset,
          limit: itemsToBeLoadedPerFetch,
        },
      });
      return data;
    }
    const selectedBtn = homeBtns.find((item) => {
      return item.btnName === btnType;
    });

    return selectedBtn?.data;
  };

  const fetchAndUpdateData = async (
    currentHomeBtns: any[],
    btnType: string
  ) => {
    const updatedHomeBtns = await Promise.all(
      currentHomeBtns.map(async (item) => {
        if (item.btnName === btnType) {
          item.currentOffset += itemsToBeLoadedPerFetch;

          const snapshot = await getMoreDataFor(
            item.btnName,
            item.currentOffset || 0
          );

          if (!snapshot) {
            console.log("Sorry snapshot is ->", snapshot);
            return [];
          }

          const newData = snapshot[Object.keys(snapshot)[0]];

          item.data = [...item.data, ...newData];

          if (newData.length < itemsToBeLoadedPerFetch) {
            item.hasMoreItems = false;
          }
        }
        return item;
      })
    );

    // console.log("Got Data ->", updatedHomeBtns);
    // if (updatedHomeBtns.length > 0) {
    //   setUpdateHomeBtns(updatedHomeBtns);
    // }
    setUpdateHomeBtns(updatedHomeBtns);
  };

  const updateBtnItem = (btnName: string, prop: string, val: any) => {
    // console.log("Updated Buttons Called -->");
    const updatedItems = homeBtns.map((item) => {
      // console.log(btnName, item.btnName);
      if (item.btnName === btnName && prop === "active") {
        const data = pollHandler(item.btnName);

        return { ...item, active: true, data };
      } else if (item.btnName !== btnName && prop === "active") {
        return { ...item, active: false };
      } else if (item.btnName === btnName && prop !== "active") {
        return { ...item, [prop as keyof CustomBtn]: val };
      } else {
        return item;
      }
    });

    setUpdateHomeBtns(updatedItems);
  };

  const updateBtnItemsNew = (btnName: string) => {
    setUpdateHomeBtns((prevHomeBtns) => {
      return prevHomeBtns.map((btn) => {
        if (btn.btnName === btnName) {
          btn.active = true;
        } else {
          btn.active = false;
        }
        return btn;
      });
    });
  };

  const updateData = (btnType: string, data: PollHistory[]) => {
    const updatedHomeBtns = homeBtns.map((item) => {
      if (item.btnName === btnType) {
        return { ...item, data };
      }
      return item;
    });
    setUpdateHomeBtns(updatedHomeBtns);
  };

  const pollHandler = (sortType: string) => {
    // console.log("Poll handler called");
    const newData = homeBtns.find((item) => {
      return item.btnName === sortType;
    });

    return newData?.data || [];
  };

  //-----------------------------------------------------------------------------------------
  //Use Effects
  useEffect(() => {
    if (!activeChatsLoading) {
      setUpdateHomeBtns((prevHomeBtns) => {
        const btns = prevHomeBtns;
        btns[0].data = activeChats.activeChatsWithPagination;
        btns[0].currentOffset = itemsToBeLoadedPerFetch;
        btns[0].hasMoreItems = true;
        return btns;
      });
    }
  }, [activeChats]);

  useEffect(() => {
    if (!trendingPollsLoading) {
      setUpdateHomeBtns((prevHomeBtns) => {
        const btns = prevHomeBtns;
        btns[1].data = trendingPolls.trendingPollsWithPagination;
        btns[1].currentOffset = itemsToBeLoadedPerFetch;
        btns[1].hasMoreItems = true;
        return btns;
      });
    }
  }, [trendingPolls]);

  useEffect(() => {
    if (!newPollsLoading) {
      setUpdateHomeBtns((prevHomeBtns) => {
        const btns = prevHomeBtns;
        btns[2].data = newPollData.newestPollsWithPagination;
        btns[2].currentOffset = itemsToBeLoadedPerFetch;
        btns[2].hasMoreItems = true;
        return btns;
      });
    }
  }, [newPollData]);

  // Selectin which button is active
  const pollData = homeBtns.filter((item) => item.active);

  //-----------------------------------------------------------------------------------------
  // Returning the jsx
  return (
    <Layout pageTitle={`Home`}>
      {/*
		<HomeBtnWindow btnList={homeBtns} update={updateBtnItem} />
	*/}

      {pollData[0] && pollData[0].data ? (
        <Box pt="6">
          <Box py="6" px={[4, 4, 24, 24, 40]}>
            <Flex wrap="wrap-reverse">
              <Box
                flex={{ base: "0 0 100%", lg: "0 0 70%" }}
                maxW={{ base: "100%", lg: "70%" }}
              >
                <InfiniteScroll
                  style={{ overflow: "hidden" }}
                  dataLength={pollData[0].data.length}
                  next={() => {
                    fetchAndUpdateData(homeBtns, pollData[0].btnName);
                  }}
                  hasMore={pollData[0].hasMoreItems}
                  loader={
                    <Flex justify="center" align="center">
                      <Spinner size="lg" color="poldit.100" />
                    </Flex>
                  }
                  scrollThreshold={-1}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Thats all thankyou !</b>
                    </p>
                  }
                >
                  <DataWindow data={pollData[0].data} />
                </InfiniteScroll>
              </Box>
              <Box
                flex={{ base: "0 0 100%", lg: "0 0 30%" }}
                maxW={{ base: "100%", lg: "30%" }}
              >
                <PollSideBar
                  activeBtn={(() => {
                    const activeBtn = homeBtns.find((btn) => btn.active);
                    return activeBtn?.btnName;
                  })()}
                  update={updateBtnItemsNew}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Flex h="calc(100vh - 60px)" justify="center" align="center">
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
