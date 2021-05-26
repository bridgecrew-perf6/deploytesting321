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
import { useAuth } from "../../../components/authProvider/authProvider";
import PollAnswers from "../../../components/pageComponents/Poll/pollAnswers";
import PollChat from "../../../components/pageComponents/Poll/Chat";
import { useMutation, useQuery } from "@apollo/client";
import { ErrorToast } from "../../../components/pageComponents/Other/Error/Toast";
import { saveImgtoCloud } from "../../../components/apis/imgUpload";
import { AddAnswer } from "../../../components/pageComponents/Poll/pollComps";

const { GET_POLL, GET_POLLS_ALL, GET_ANSWERS_BY_POLL } = GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  data: { poll: PollHistory };
}

const poll = ({ data }: Props) => {
  //States
  const [error, updateError] = useState<string[]>([]);
  const [answerWindow, showAnswerWindow] = useState(false);

  //Graph API Requests
  const [addAnswerToPolls] = useMutation(
    GraphResolvers.mutations.CREATE_ANSWER,
    {
      onError: (e) => addError(e.message),
    }
  );

  const {
    data: answerData,
    loading,
    subscribeToMore,
  } = useQuery(GraphResolvers.queries.GET_ANSWERS_BY_POLL, {
    variables: { pollId: data.poll._id },
  });

  //Component Mounted
  useEffect(() => {
    if (answerData) {
      subscribeToMore({
        document: GraphResolvers.subscriptions.ANSWER_SUBSCRIPTION,
        variables: { pollId: data.poll._id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newAnswerItem = subscriptionData.data.newAnswer;
          const answerMatchIdx: number = prev.answersByPoll.findIndex(
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
  }, [answerData]);

  //Functions
  const toggleAddAnswer = () => {
    showAnswerWindow(!answerWindow);
  };

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

  const addAnswer = async (answer: string, answerImages: SelectedImage[]) => {
    const imgIds: string[] | undefined = await saveImgtoCloud(answerImages);

    const answerObj = {
      answer,
      poll: data.poll._id,
      answerImages: imgIds && imgIds,
    };

    addAnswerToPolls({
      variables: {
        details: JSON.stringify(answerObj),
      },
      refetchQueries: [
        {
          query: GET_ANSWERS_BY_POLL,
          variables: { pollId: data.poll._id },
        },
      ],
    });
  };

  return (
    <SitePageContainer title={`Poll`}>
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
      <PollAnswers
        creator={data.poll.creator}
        poll={data.poll._id}
        loading={loading}
        answers={answerData?.answersByPoll}
      />

      <PollChat
        pollId={data.poll._id}
        addAnswer={addAnswer}
        addError={addError}
      />
    </SitePageContainer>
  );
};

export default poll;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await apolloClient.query({
    query: GET_POLL,
    variables: { pollId: context?.params?.id },
  });

  return {
    props: {
      data: res.data,
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
    fallback: false,
  };
};
