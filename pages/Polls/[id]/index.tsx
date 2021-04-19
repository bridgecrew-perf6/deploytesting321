import Link from "next/link";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { initializeApollo } from "../../../lib/apollo";
import { PollHistory } from "../../../components/appTypes/appType";
import { SitePageContainer } from "../../../components/layout";
import PollQuestion from "../../../components/pageComponents/Poll/pollQuestion";
import { PollFilters } from "../../../components/pageComponents/Poll/pollComps";

import TopicWindow from "../../../components/pageComponents/Other/TopicWindow";

const { GET_POLL, GET_POLLS_ALL } = GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  data: { poll: PollHistory };
}

const poll = ({ data }: Props) => {
  return (
    <SitePageContainer title={`Poll`}>
      {JSON.stringify(data)}
      {/* <TopicWindow /> */}
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
