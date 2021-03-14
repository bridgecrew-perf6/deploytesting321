import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { initializeApollo } from "../../../lib/apollo";
import { PollHistory } from "../../../components/appTypes/appType";

const { GET_POLL, GET_POLLS_ALL } = GraphResolvers.queries;
const apolloClient = initializeApollo();

interface Props {
  data: PollHistory;
}

const poll = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div>
      {JSON.stringify(data)}
      <Link href={"/"}>
        <button>Go Back</button>
      </Link>
    </div>
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
