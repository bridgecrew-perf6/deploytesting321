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
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Layout from "_components/layout/Layout";

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
  //Use Effects
  useEffect(() => {
    setUpdateHomeBtns(btnItems);
    if (!activeChatsLoading) {
      homeBtns[0].data = activeChats.activeChatsWithPagination;
      homeBtns[1].data = trendingPolls.trendingPollsWithPagination;
      homeBtns[2].data = newPollData.newestPollsWithPagination;
    }
    homeBtns.forEach((btn) => {
      btn.currentOffset = 0;
      btn.hasMoreItems = true;
    });
  }, []);

  //-----------------------------------------------------------------------------------------
  // Queries
  const {
    data: newPollData,
    loading: newPollsLoading,
    fetchMore: newPollsFetchMore,
  } = useQuery(NEWEST_POLLS_WITH_PAGINATION, {
    onCompleted: (res) => {
      // console.log(res);
      return updateData("Newest Polls", res.newestPollsWithPagination);
    },
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
    onCompleted: (res) => {
      // console.log(res);
      updateData("Active Chats", res.activeChatsWithPagination);
    },
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
    onCompleted: (res) => {
      // console.log(res);
      updateData("Trending Polls", res.trendingPollsWithPagination);
    },
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
        <>
          <div style={{ marginTop: "20px" }}>
            <InfiniteScroll
              dataLength={pollData[0].data.length}
              next={() => {
                fetchAndUpdateData(homeBtns, pollData[0].btnName);
              }}
              hasMore={pollData[0].hasMoreItems}
              loader={
                <>
                  {/* {console.log(pollData)} */}
                  <AppLoadingLite />
                </>
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
          </div>
          <div style={{ marginTop: "20px" }}>&nbsp;</div>
        </>
      ) : (
        <Flex h="100vh" justify="center" align="center">
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
