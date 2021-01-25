import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
// import {} from "next";
import { initializeApollo } from "../lib/apollo";
import { useAuth } from "../components/authProvider";
import GraphResolvers from "../lib/apollo/apiGraphStrings";

const { GET_ALL_USERS, LOG_OUT } = GraphResolvers.queries;

export default function Home() {
  // const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [logout, { loading, data, error }] = useLazyQuery(LOG_OUT);
  // const [logOutState, toggleLogOut] = useState();

  if (loading) return <span>loading...</span>;

  if (error) {
    console.log(error);
    return <span>Error loading users</span>;
  }

  return (
    <div className="container">
      <h1>HOME PAGE</h1>
      <Link href={"/Login"}>
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
      </Link>
      <Link href={"/Polls/PollItem"}>
        <button type="submit" className="btn btn-primary">
          Poll Item
        </button>
      </Link>
      <Link href={"/Profile"}>
        <button type="submit" className="btn btn-primary">
          Profile
        </button>
      </Link>
      <button
        type="button"
        // onClick={this.props.handleLogout}
        className="btn btn-primary"
        onClick={() => logout()}
      >
        LogOut
      </button>
      <p>{JSON.stringify(data)}</p>
      {/* {data.logout && <p>{data.logout}</p>} */}
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_USERS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
