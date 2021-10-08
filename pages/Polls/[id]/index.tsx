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
import PollAnswers from "../../../components/pageComponents/Poll/pollAnswers";
import PollChat from "../../../components/pageComponents/Poll/Chat";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ErrorToast } from "../../../components/pageComponents/Other/Error/Toast";
import { saveImgtoCloud } from "../../../components/apis/imgUpload";
import { AddAnswer } from "../../../components/pageComponents/Poll/pollComps";
import { MaxMinBtn } from "../../../components/layout/customComps";
import {
  addNewAnswer,
  updateViewCount,
} from "../../../lib/apollo/apolloFunctions";
import { useAuth } from "../../../components/authProvider/authProvider";

const { GET_POLL, GET_POLLS_ALL, GET_USER, GET_USER_FOR_POLL } =
  GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  pollId: string;
  // data: { poll: PollHistory };
}

const Poll = ({ pollId }: Props) => {
  const appContext = useAuth();

  //States
  const [error, updateError] = useState<string[]>([]);
  const [answerWindow, showAnswerWindow] = useState(false);
  const [answersSection, showAnswersSection] = useState(false);
  const [chatSection, showChatSection] = useState(false);
  const [userInfo, setUser] = useState();
  //Graph API Requests
  const { data } = useQuery(GET_POLL, {
    variables: { pollId },
  });

  // const { data: appUserData } = useQuery(GET_USER, {
  //   onCompleted: (res) => {
  //     setUser(res.getUserData.user);
  //   },
  // });
  // console.log(userInfo);

  const [getUser, { data: user }] = useLazyQuery(GET_USER_FOR_POLL);
  // console.log(data);

  const [addAnswerToPolls] = useMutation(
    GraphResolvers.mutations.CREATE_ANSWER,
    {
      onError: (e: any) => addError(e.message),
    }
  );

  const [addView] = useMutation(GraphResolvers.mutations.ADD_VIEW);

  const {
    data: answerData,
    loading,
    subscribeToMore,
  } = useQuery(GraphResolvers.queries.GET_ANSWERS_BY_POLL, {
    variables: { pollId },
  });

  // //Component Mounted

  useEffect(() => {
    updateViewCount(addView, pollId);
  }, []);

  useEffect(() => {
    appContext?.authState?.getUserData?.appToken !== "" && getUser();

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

  const addError = (errMssg?: string) => {
    if (errMssg) {
      updateError([...error, errMssg]);
    } else updateError([]);
  };

  const removeError = (errId: number) => {
    let udpatedErrorList: string[] = [];
    if (error.length > 1) {
      udpatedErrorList = error.filter(
        (item: any, idx: number) => errId === idx
      );
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

  if (data) {
    return (
      <SitePageContainer title={`Poll`}>
        <div style={{ marginTop: "100px" }}>
          <PollQuestion
            pollData={data.poll}
            numAnswers={
              answerData?.answersByPoll ? answerData?.answersByPoll.length : 0
            }
            showAdd={toggleAddAnswer}
          />
          {error && (
            <ErrorToast
              mssgs={error}
              mssgType={"Poll Answer Error"}
              removeError={removeError}
            />
          )}
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
