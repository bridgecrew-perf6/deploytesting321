import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { initializeApollo } from "../../../lib/apollo";
import { PollHistory, User } from "../../../components/appTypes/appType";
import { SitePageContainer } from "../../../components/layout";
import PollQuestion from "../../../components/pageComponents/Poll/pollQuestion";
import { useAuth } from "../../../components/authProvider/authProvider";
import PollAnswers from "../../../components/pageComponents/Poll/pollAnswers";
import PollChat from "../../../components/pageComponents/Poll/Chat";

const { GET_POLL, GET_POLLS_ALL } = GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  data: { poll: PollHistory };
}

const poll = ({ data }: Props) => {
  const [answerWindow, showAnswerWindow] = useState(false);

  const toggleAddAnswer = () => {
    showAnswerWindow(!answerWindow);
  };

  return (
    <SitePageContainer title={`Poll`}>
      <PollQuestion pollData={data.poll} showAdd={toggleAddAnswer} />
      <PollChat pollId={data.poll._id} />
      {/* <PollAnswers
        creator={data.poll.creator}
        poll={data.poll._id}
        newAnswer={answerWindow}
        showAdd={toggleAddAnswer}
      /> */}
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
