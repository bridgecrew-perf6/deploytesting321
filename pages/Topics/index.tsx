import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PollCard } from "_components/pageComponents/ProfilePage/MyPollsTabs";

import { useRouter } from "next/router";
import Layout from "_components/layout/Layout";
import { ISubTopic, ITopic, PollHistory } from "_components/appTypes/appType";
import { useQuery, useLazyQuery } from "@apollo/client";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import SubTopicBox from "_components/pageComponents/Topics/subTopics";
import TopicBox from "_components/pageComponents/Topics/topics";
import { handleStorage } from "_components/formFuncs/formFuncs";
import InfiniteScroller from "_components/pageComponents/Other/InfiniteScroll";
import DataWindow from "_components/pageComponents/Home/DataWindow";
import {
  getObjList_NoDuplicates,
  getUniqueObjList,
  roundValue,
} from "_components/globalFuncs";
import InfiniteScroll from "react-infinite-scroller";
import { filterSearchVals } from "_components/formFuncs/miscFuncs";

// const dataItem = {
//   data: [] as any[],
//   currentOffset: 0,
//   hasMoreItems: true,
// };

const TopicPage = ({}: any) => {
  const router = useRouter();
  const itemLimit = 5;
  const myRef = useRef(null);

  const storedData =
    typeof window !== "undefined" &&
    (localStorage.getItem("PoldIt-data") as string);

  const [selectedTopic, setSelectedTopic] = useState<ITopic | null>();
  const [selectedSubTopic, setSelectedSubTopic] = useState<ISubTopic | null>();
  const [allTopics, setAllTopics] = useState<ITopic[]>([]);
  const [subTopicsByTopic, setSubTopicsByTopic] = useState<ISubTopic[]>([]);
  const [polls, updatePolls] = useState<PollHistory[]>([]);
  // const [hasMore, setHasMore] = useState(true);
  // const [currOffset, setCurrOffset] = useState(0);
  // const [pollsItem, updatePollsItem] = useState(dataItem);

  const { data: topics, loading: topicsLoading } = useQuery(
    GraphResolvers.queries.GET_TOPICS,
    {
      onCompleted: (res) => setAllTopics(res.topics),
    }
  );

  const { data: subTopics, loading: subTopicsLoading } = useQuery(
    GraphResolvers.queries.GET_SUBTOPICS
  );

  const [getPolls, { data: pollData, loading: pollLoading, fetchMore }] =
    useLazyQuery(GraphResolvers.queries.GET_POLLS_BY_TAG, {
      fetchPolicy: "network-only",
      // onCompleted: (res) => updatePolls(res.pollsByTag),
    });

  const updateSelector = (btnType: string, btnId: string) => {
    if (btnType === "topic" && topics) {
      const topic: ITopic = topics.topics.find(
        (item: ITopic) => item._id === btnId
      );

      const AllTopic: ITopic = {
        _id: "All_1",
        description: "",
        topic: "All Topics",
      };

      const pickedTopic = topic ? topic : AllTopic;

      setSelectedTopic(pickedTopic);
      subCategoriesSelector(pickedTopic._id);
      setSelectedSubTopic(null);
    }

    if (btnType === "subTopic" && subTopics) {
      const subTopic: ISubTopic = subTopics.subTopics.find(
        (item: ISubTopic) => item._id === btnId
      );
      if (subTopic) {
        setSelectedSubTopic(subTopic);
        setSubTopicsByTopic(subTopics.subTopics as ISubTopic[]);
      }
    }

    getPolls({ variables: { tag: btnId, offset: 0, limit: itemLimit } });
    (document.querySelector("#searchTxt") as HTMLInputElement).value = "";
  };

  const subCategoriesSelector = (topicId: string) => {
    if (subTopics) {
      const selectedSubsByTopic: ISubTopic[] = subTopics.subTopics.filter(
        (item: ISubTopic) => item.topic._id === topicId
      );
      selectedSubsByTopic.length > 0
        ? setSubTopicsByTopic(selectedSubsByTopic)
        : setSubTopicsByTopic(subTopics.subTopics);
    }
  };

  const searchTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (topics && subTopics) {
      const topicResults = filterSearchVals(
        topics.topics,
        e.target.value,
        "topic"
      );
      const subTopicResults = filterSearchVals(
        subTopics.subTopics,
        e.target.value,
        "subTopic"
      );

      topicResults.length > 0 ? setAllTopics(topicResults) : setAllTopics([]);
      subTopicResults.length > 0
        ? setSubTopicsByTopic(subTopicResults)
        : setSubTopicsByTopic([]);
    }
  };

  const fetchAndUpdate = async (e: number = 1) => {
    // console.log("e: ", e);
    // console.log(selectedTopic);
    // const pollPages = selectedTopic
    //   ? (selectedTopic.numPolls as number) / 5
    //   : (selectedSubTopic?.numPolls as number) / 5;
    // console.log(pollPages);
    // console.log("pollCount", Math.round(pollPages));
    // const newOffset = currOffset + itemLimit;
    // const { data } = await fetchMore({
    //   variables: {
    //     offset: newOffset || 0,
    //     limit: itemLimit,
    //   },
    // });
    // console.log(data);
    // const newData = data[Object.keys(data)[0]];
    // const updatedPolls = getObjList_NoDuplicates(polls, newData);
    // if (updatedPolls.length > 0) {
    //   updatePolls(updatedPolls);
    //   setCurrOffset(newOffset);
    // }
    // if (newData.length === 0) {
    //   setHasMore(false);
    // }
    // if (data.pollsByTag.length > 0 && polls.length > 0) {
    //   const newData = data[Object.keys(data)[0]];
    //   const updatedPolls = getObjList_NoDuplicates(polls, newData);
    //   updatePolls(updatedPolls);
    //   setCurrOffset(newOffset);
    //   if (newData.length < itemLimit) {
    //     setHasMore(false);
    //   }
    // }
  };

  useEffect(() => {
    if (router.query.id) {
      const { id, tagType } = router.query;
      updateSelector(tagType as string, id as string);
      handleStorage("PoldIt-data", "tags", router.query);
    }
  }, [subTopicsLoading]);

  useEffect(() => {
    if (storedData && !router.query.id) {
      const { tags } = JSON.parse(storedData);
      updateSelector(tags.tagType as string, tags.id as string);
    }
  }, [topicsLoading || subTopicsLoading]);

  useEffect(() => {
    if (!pollLoading && pollData) {
      updatePolls(pollData.pollsByTag);
    }
  }, [pollData]);

  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex wrap="wrap" pt="6">
          <Flex
            flex={{ base: "0 0 100%", lg: "0 0 30%" }}
            mt={{ base: 3, lg: 0 }}
            justify="center"
          >
            <Box
              position={{ base: "relative", lg: "sticky" }}
              pl="2"
              pr={{ base: 2, lg: 6 }}
              h={{ base: "100%", lg: "calc(100vh - 76px)" }}
              top={{ base: "0", lg: "6.6rem" }}
              mb={{ base: 8, lg: 0 }}
            >
              <Box mb="5">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiSearch size="20" />}
                    h="100%"
                  />
                  <Input
                    size="md"
                    id="searchTxt"
                    placeholder="Search topics and subtopics"
                    borderColor="gray.300"
                    borderRadius="md"
                    maxW="95%"
                    onChange={searchTags}
                  />
                </InputGroup>
              </Box>
              <Box pb="6">
                <Box>
                  <Text color="gray.700" fontWeight="bold" fontSize="lg">
                    Poll Topics
                  </Text>
                  <TopicBox
                    loading={topicsLoading}
                    data={allTopics}
                    selected={selectedTopic}
                    update={updateSelector}
                  />
                </Box>
              </Box>
              <Box borderBottom="1px solid #d3d3d3" maxW="95%"></Box>
              <Box mt="6">
                <Text color="gray.700" fontWeight="bold" fontSize="lg">
                  Poll SubTopics
                </Text>
                <SubTopicBox
                  loading={subTopicsLoading}
                  data={subTopicsByTopic}
                  selected={selectedSubTopic}
                  update={updateSelector}
                />
              </Box>
            </Box>
          </Flex>
          <Flex
            flex={{ base: "0 0 100%", lg: "0 0 70%" }}
            w="100%"
            maxW={"850px"}
            mt="6"
            ref={myRef}
          >
            <Box w="100%">
              {pollLoading ? (
                <Flex justify="center" align="center" minH="300px">
                  <Spinner size="lg" color="poldit.100" />
                </Flex>
              ) : (
                <Box ml="10">
                  <DataWindow data={polls} />
                  {/* <InfiniteScroll
                    pageStart={0}
                    style={{ overflow: "hidden" }}
                    loadMore={() => fetchAndUpdate()}
                    loader={
                      <Flex justify="center" align="center" key={"topicLoader"}>
                        <Spinner size="lg" color="poldit.100" />
                      </Flex>
                    }
                    hasMore={hasMore}
                  >
                    <DataWindow data={polls} />
                  </InfiniteScroll> */}

                  {/* <InfiniteScroller
                    loadMore={fetchAndUpdate}
                    hasMoreItems={hasMore}
                    loaderKey="topicLoader"
                  >
                    <DataWindow data={polls} />
                  </InfiniteScroller> */}
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default TopicPage;
