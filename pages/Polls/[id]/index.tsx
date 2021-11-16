import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { initializeApollo } from "../../../lib/apollo";
import {
  Answer,
  PollHistory,
  SelectedImage,
  User,
} from "../../../components/appTypes/appType";
import { SitePageContainer } from "../../../components/layout";
import PollQuestion from "../../../components/pageComponents/Poll/pollQuestion";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ErrorToast } from "../../../components/pageComponents/Other/Error/Toast";
import { saveImgtoCloud } from "../../../components/apis/imgUpload";
import {
  addNewAnswer,
  updateViewCount,
} from "../../../lib/apollo/apolloFunctions/mutations";
import AnsBox from "../../../components/pageComponents/Poll/AnsBox/AnsBox";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import PollAnswers from "../../../components/pageComponents/Poll/pollAnswers";
import ChatTab from "../../../components/pageComponents/Poll/ChatBox/ChatTab";
import { UserTab } from "../../../components/pageComponents/Poll/UserTab/UserTab";

const { GET_POLL, GET_POLLS_ALL, GET_USER_FOR_POLL } = GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  pollId: string;
  // data: { poll: PollHistory };
}

const Poll = ({ pollId }: Props) => {
  //States
  const [error, updateError] = useState<string[]>([]);
  const [refreshedPollId, updatedPollId] = useState("");

  //Graph API Requests
  const { data } = useQuery(GET_POLL, {
    variables: { pollId },
  });
  const flexObj = {
    flex: {
      base: "0 0 100%",
      lg: "0 0 50%",
    },
    maxW: { base: "100%", lg: "50%" },
    justifyContent: "center",
  };

  const { data: user } = useQuery(GET_USER_FOR_POLL);

  const [addAnswerToPolls] = useMutation(
    GraphResolvers.mutations.CREATE_ANSWER,
    {
      onError: (e) => addError(e.message),
    }
  );

  const [addView] = useMutation(GraphResolvers.mutations.ADD_VIEW);

  const {
    data: answerData,
    loading,
    error: answerError,
    subscribeToMore,
  } = useQuery(GraphResolvers.queries.GET_ANSWERS_BY_POLL, {
    variables: { pollId },
  });

  // //Component Mounted

  // useEffect(() => {
  //   if (router && router.query && router.query.id) {
  //     updatedPollId(router.query.id as string);
  //   }
  // }, [router]);

  useEffect(() => {
    updateViewCount(addView, pollId);
  }, []);

  useEffect(() => {
    if (answerData && subscribeToMore) {
      subscribeToMore({
        document: GraphResolvers.subscriptions.ANSWER_SUBSCRIPTION,
        variables: { pollId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newAnswerItem = subscriptionData.data.newAnswer;
          const answerMatchIdx: number = prev?.answersByPoll.findIndex(
            (item: Answer) => item._id === newAnswerItem._id
          );
          if (answerMatchIdx > -1) {
            //Answer already exists.  This is for likes and dislikes count update without adding new answer
            const updatedAnswersByPoll = prev.answersByPoll.map(
              (item: Answer, idx: number) => {
                if (idx === answerMatchIdx) {
                  return newAnswerItem;
                } else return item;
              }
            );
            return Object.assign({}, prev, {
              answersByPoll: updatedAnswersByPoll,
            });
          }
          return Object.assign({}, prev, {
            answersByPoll: [...prev.answersByPoll, newAnswerItem],
          });
        },
      });
    }
  }, [data, answerData]);

  // //Functions

  const addError = (errMssg?: string) => {
    if (errMssg) {
      updateError([...error, errMssg]);
    } else updateError([]);
  };

  const removeError = (errId: number) => {
    let udpatedErrorList: string[] = [];
    if (error.length > 1) {
      udpatedErrorList = error.filter((item, idx) => errId === idx);
    } else {
      udpatedErrorList = [];
    }

    updateError(udpatedErrorList);
  };

  const addAnswer = async (answer: string, answerImage: SelectedImage) => {
    let imgId: string | null = null;

    const answerObj: any = {
      answer,
      poll: data.poll._id,
      // answerImage: imgId && imgId,
    };

    if (answerImage) {
      imgId = await saveImgtoCloud(answerImage);
      answerObj["answerImage"] = imgId;
    }

    addAnswerToPolls({ variables: { details: JSON.stringify(answerObj) } });

    // addNewAnswer(addAnswerToPolls, JSON.stringify(answerObj), data.poll._id);
  };

  if (data) {
    return (
      <SitePageContainer title={`Poll`}>
        <div style={{ marginTop: "100px" }}>
          <PollQuestion pollData={data.poll} />
          {error && (
            <ErrorToast
              mssgs={error}
              mssgType={"Poll Answer Error"}
              removeError={removeError}
            />
          )}
          <Flex wrap="wrap" pb={6} px={[0, 0, 20, 20, 36]}>
            <Box {...flexObj} p={4}>
              <AnsBox
                answers={answerData?.answersByPoll}
                loading={loading}
                addAnswer={addAnswer}
                pollId={data.poll._id}
                pollType={data.poll.pollType}
                error={answerError}
              />
            </Box>
            <Box {...flexObj} p={4}>
              <Box
                bg="white"
                pt={6}
                minW="350px"
                boxShadow="0 1px 10px -1px rgba(0,0,0,.2)"
              >
                <Tabs isFitted>
                  <TabList mx={[0, 0, 6]}>
                    <Tab
                      _focus={{ outline: "none" }}
                      fontWeight="bold"
                      _selected={{
                        color: "poldit.100",
                        borderBottom: "2px solid",
                      }}
                      fontSize={["sm", "sm", "md"]}
                    >
                      Chat
                    </Tab>
                    <Tab
                      _focus={{ outline: "none" }}
                      fontWeight="bold"
                      _selected={{
                        color: "poldit.100",
                        borderBottom: "2px solid",
                      }}
                      fontSize={["sm", "sm", "md"]}
                    >
                      User List
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel p="0">
                      <ChatTab
                        pollId={data.poll._id}
                        user={user && user?.getUserDataForPoll}
                        addAnswer={addAnswer}
                      />
                    </TabPanel>
                    <TabPanel p="0">
                      <UserTab />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Flex>
          {/*
			  <div className="position-relative mb-2">
			  <MaxMinBtn
			  btnState={chatSection}
			  toggleBtn={toggleSection}
			  btnCat="chat"
			  />
			  <PollChat
			  pollId={data.poll._id}
			  addAnswer={addAnswer}
			  addError={addError}
			  showSection={chatSection}
			  user={user && user?.getUserDataForPoll}
			  />
			  </div>
		  */}
        </div>
      </SitePageContainer>
    );
  }

  return <div>Loading...</div>;
};

export default Poll;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      pollId: params?.id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await apolloClient.query({
    query: GET_POLLS_ALL,
  });

  const ids: string[] = res.data.polls.map((poll: PollHistory) => poll._id);
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};
