import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import GraphResolvers from "../lib/apollo/apiGraphStrings";
import { CustomBtn, PollHistory } from "../components/appTypes/appType";
import DataWindow from "../components/pageComponents/Home/DataWindow";
import { useAuth } from "../components/authProvider/authProvider";
import InfiniteScroll from "react-infinite-scroller";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Layout from "_components/layout/Layout";
import { PollSideBar } from "_components/pageComponents/Home/PollSidebar";
import _ from "lodash";
import "react-photo-view/dist/index.css";
import TopicWindow from "_components/pageComponents/Home/TopicWindow";
import InfiniteScroller from "_components/pageComponents/Other/InfiniteScroll";

const {
  NEWEST_POLLS_WITH_PAGINATION,
  ACTIVECHAT_WITH_PAGINATION,
  TRENDING_POLLS_WITH_PAGINATION,
  GET_TOPICS,
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
  const [loading, setLoading] = useState<Boolean>(true);
  const [pollData, setPollData] = useState<any[]>([]);
  // setPollData(homeBtns.filter((item) => item.active));

  //-----------------------------------------------------------------------------------------
  // Queries
  const {
    data: newPollData,
    loading: newPollsLoading,
    fetchMore: newPollsFetchMore,
    refetch: newPollsRefetch,
  } = useQuery(NEWEST_POLLS_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
    fetchPolicy: "network-only",
  });

  const { data: topics, loading: topicLoading } = useQuery(GET_TOPICS);

  const {
    data: activeChats,
    loading: activeChatsLoading,
    fetchMore: activeChatsFetchmore,
    refetch: activeChatsRefetch,
  } = useQuery(ACTIVECHAT_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
    fetchPolicy: "network-only",
  });

  const {
    data: trendingPolls,
    loading: trendingPollsLoading,
    fetchMore: trendingPollsFetchMore,
    refetch: trendingPollsRefetch,
  } = useQuery(TRENDING_POLLS_WITH_PAGINATION, {
    variables: {
      offset: 0,
      limit: itemsToBeLoadedPerFetch,
    },
    fetchPolicy: "network-only",
  });

  // console.log(activeChats);

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
      // console.log(data);
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
  };

  // const fetchAndUpdateData = async (
  //   currentHomeBtns: any[],
  //   btnType: string
  // ) => {
  const fetchAndUpdateData = async () => {
    const updatedHomeBtns = await Promise.all(
      homeBtns.map(async (item) => {
        if (item.btnName === pollData[0].btnName) {
          item.currentOffset += itemsToBeLoadedPerFetch;
          // console.log(item.currentOffset, btnType);
          const snapshot = await getMoreDataFor(
            item.btnName,
            item.currentOffset || 0
          );
          if (!snapshot) {
            return [];
          }

          const newData = snapshot[Object.keys(snapshot)[0]];
          let p: any = [];
          p.push([...item.data, ...newData]);
          let arr = p[0];
          let unique = _.uniqBy(arr, function (e: any) {
            return e._id;
          });
          item.data = unique;
          if (
            pollData[0].data[0].totalPolls <= pollData[0].data.length ||
            newData.length === 0
          ) {
            item.hasMoreItems = false;
          }
          // if (newData.length < itemsToBeLoadedPerFetch) {
          //   item.hasMoreItems = false;
          // }
        }
        return item;
      })
    );

    setUpdateHomeBtns(updatedHomeBtns as HomeBtns[]);
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
    const activeBtns = homeBtns.filter((btn) => btn.active);

    setPollData(activeBtns);
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

  //-----------------------------------------------------------------------------------------
  //Use Effects
  useEffect(() => {
    if (!activeChatsLoading && loading) {
      setUpdateHomeBtns((prevHomeBtns) => {
        const btns = prevHomeBtns;
        btns[0].data = activeChats?.activeChatsWithPagination;
        btns[0].currentOffset = itemsToBeLoadedPerFetch;
        btns[0].hasMoreItems = true;
        return btns;
      });

      const activeBtns = homeBtns.filter((btn) => btn.active);
      setPollData(activeBtns);
      setLoading(false);
    }
  }, [activeChatsLoading, loading]);

  // useEffect(() => {
  //   if (!trendingPollsLoading) {
  //     setUpdateHomeBtns((prevHomeBtns) => {
  //       const btns = prevHomeBtns;
  //       btns[1].data = trendingPolls.trendingPollsWithPagination;
  //       btns[1].currentOffset = itemsToBeLoadedPerFetch;
  //       btns[1].hasMoreItems = true;
  //       return btns;
  //     });
  //   }
  // }, [trendingPolls]);

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

  // console.log(pollData);

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
                <InfiniteScroller
                  loadMore={fetchAndUpdateData}
                  hasMoreItems={pollData[0].hasMoreItems}
                  loaderKey="homeLoader"
                >
                  <DataWindow
                    data={pollData[0].data}
                    btn={pollData[0].btnName}
                    update={updateData}
                  />
                </InfiniteScroller>
                {/* <InfiniteScroll
                  pageStart={0}
                  style={{ overflow: "hidden" }}
                  loadMore={() => {
                    fetchAndUpdateData(homeBtns, pollData[0].btnName);
                  }}
                  hasMore={pollData[0].hasMoreItems}
                  loader={
                    <Flex justify="center" align="center" key={"homeLoader"}>
                      <Spinner size="lg" color="poldit.100" />
                    </Flex>
                  }
                >
                  <DataWindow
                    data={pollData[0].data}
                    btn={pollData[0].btnName}
                    update={updateData}
                  />
                </InfiniteScroll> */}
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
                <TopicWindow data={topics?.topics} loading={topicLoading} />
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
