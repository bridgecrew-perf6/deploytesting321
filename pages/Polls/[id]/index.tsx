import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { initializeApollo } from "../../../lib/apollo";
import {
  Answer,
  PollHistory,
  SelectedImage,
<<<<<<< HEAD
} from "../../../components/appTypes/appType";
import { SitePageContainer } from "../../../components/layout";
import PollQuestion from "../../../components/pageComponents/Poll/pollQuestion";
import PollChat from "../../../components/pageComponents/Poll/Chat";
import { useMutation, useQuery } from "@apollo/client";
import { ErrorToast } from "../../../components/pageComponents/Other/Error/Toast";
import { saveImgtoCloud } from "../../../components/apis/imgUpload";
=======
  User,
} from "../../../components/appTypes/appType";
import { SitePageContainer } from "../../../components/layout";
import PollQuestion from "../../../components/pageComponents/Poll/pollQuestion";
import PollAnswers from "../../../components/pageComponents/Poll/pollAnswers";
import PollChat from "../../../components/pageComponents/Poll/Chat";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ErrorToast } from "../../../components/pageComponents/Other/Error/Toast";
import { saveImgtoCloud } from "../../../components/apis/imgUpload";
import { AddAnswer } from "../../../components/pageComponents/Poll/pollComps";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
import { MaxMinBtn } from "../../../components/layout/customComps";
import {
  addNewAnswer,
  updateViewCount,
<<<<<<< HEAD
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
=======
} from "../../../lib/apollo/apolloFunctions";
import { useAuth } from "../../../components/authProvider/authProvider";

const { GET_POLL, GET_POLLS_ALL, GET_USER, GET_USER_FOR_POLL } =
  GraphResolvers.queries;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
const apolloClient = initializeApollo();

interface Props {
  pollId: string;
  // data: { poll: PollHistory };
}

const Poll = ({ pollId }: Props) => {
<<<<<<< HEAD
  //States
  const [error, updateError] = useState<string[]>([]);

=======
  const appContext = useAuth();

  //States
  const [error, updateError] = useState<string[]>([]);
  const [answerWindow, showAnswerWindow] = useState(false);
  const [answersSection, showAnswersSection] = useState(false);
  const [chatSection, showChatSection] = useState(false);
  const [userInfo, setUser] = useState();
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
  //Graph API Requests
  const { data } = useQuery(GET_POLL, {
    variables: { pollId },
  });
<<<<<<< HEAD
  const flexObj = {
    flex: {
      base: "0 0 100%",
      lg: "0 0 50%",
    },
    maxW: { base: "100%", lg: "50%" },
    justifyContent: "center",
  };

  const { data: user } = useQuery(GET_USER_FOR_POLL);
=======

  // const { data: appUserData } = useQuery(GET_USER, {
  //   onCompleted: (res) => {
  //     setUser(res.getUserData.user);
  //   },
  // });
  // console.log(userInfo);

  const [getUser, { data: user }] = useLazyQuery(GET_USER_FOR_POLL);
  // console.log(data);
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

  const [addAnswerToPolls] = useMutation(
    GraphResolvers.mutations.CREATE_ANSWER,
    {
<<<<<<< HEAD
      onError: (e) => addError(e.message),
=======
      onError: (e: any) => addError(e.message),
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    }
  );

  const [addView] = useMutation(GraphResolvers.mutations.ADD_VIEW);

  const {
    data: answerData,
    loading,
<<<<<<< HEAD
    error: answerError,
=======
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    subscribeToMore,
  } = useQuery(GraphResolvers.queries.GET_ANSWERS_BY_POLL, {
    variables: { pollId },
  });

  // //Component Mounted

  useEffect(() => {
<<<<<<< HEAD
    updateViewCount(addView, pollId);
  }, []);

  useEffect(() => {
=======
    data && updateViewCount(addView, pollId);
  }, []);

  useEffect(() => {
    appContext?.authState?.getUserData?.appToken !== "" && getUser();

>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
<<<<<<< HEAD
  }, [data, answerData]);

  // //Functions
=======
  }, [pollId, user, data, answerData]);

  // //Functions
  const toggleAddAnswer = () => {
    showAnswerWindow(!answerWindow);
  };

  const toggleSection = (section: string) => {
    if (section === "answers") {
      showAnswersSection(!answersSection);
    } else {
      showChatSection(!chatSection);
    }
  };
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

  const addError = (errMssg?: string) => {
    if (errMssg) {
      updateError([...error, errMssg]);
    } else updateError([]);
  };

  const removeError = (errId: number) => {
    let udpatedErrorList: string[] = [];
    if (error.length > 1) {
<<<<<<< HEAD
      udpatedErrorList = error.filter((item, idx) => errId === idx);
=======
      udpatedErrorList = error.filter(
        (item: any, idx: number) => errId === idx
      );
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    } else {
      udpatedErrorList = [];
    }

    updateError(udpatedErrorList);
  };

  const addAnswer = async (answer: string, answerImages: SelectedImage[]) => {
    const imgIds: string[] | undefined = await saveImgtoCloud(answerImages);

    const answerObj = {
      answer,
      poll: data.poll._id,
      answerImages: imgIds && imgIds,
    };

    addNewAnswer(addAnswerToPolls, JSON.stringify(answerObj), data.poll._id);
  };
<<<<<<< HEAD
  console.log("myData>>>", data);
  console.log("ansDATA>>>", answerData);
=======
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

  if (data) {
    return (
      <SitePageContainer title={`Poll`}>
        <div style={{ marginTop: "100px" }}>
<<<<<<< HEAD
          <PollQuestion pollData={data.poll} />
=======
          <PollQuestion
            pollData={data.poll}
            numAnswers={
              answerData?.answersByPoll ? answerData?.answersByPoll.length : 0
            }
            showAdd={toggleAddAnswer}
          />
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
          {error && (
            <ErrorToast
              mssgs={error}
              mssgType={"Poll Answer Error"}
              removeError={removeError}
            />
          )}
<<<<<<< HEAD
          <Flex wrap="wrap" pb={6} bg="white" px={[0, 0, 20, 20, 36]}>
            <Box {...flexObj} p={4}>
              <AnsBox
                answers={answerData?.answersByPoll}
                loading={loading}
                addAnswer={addAnswer}
                poll={data.poll._id}
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
=======
          {answerWindow && (
            <div className="m-3">
              <AddAnswer
                addAnswer={addAnswer}
                addError={addError}
                toggleWindow={toggleAddAnswer}
              />
            </div>
          )}
          <div className="position-relative">
            <MaxMinBtn
              btnState={answersSection}
              toggleBtn={toggleSection}
              btnCat="answers"
            />
            <PollAnswers
              creator={data.poll.creator}
              poll={data.poll._id}
              loading={loading}
              answers={answerData?.answersByPoll}
              showSection={answersSection}
              addError={addError}
            />
          </div>

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
              user={user?.getUserDataForPoll}
            />
          </div>
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
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
