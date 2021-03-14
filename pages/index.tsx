import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { initializeApollo } from "../lib/apollo";
import { useAuth } from "../components/authProvider/authProvider";
import GraphResolvers from "../lib/apollo/apiGraphStrings";
import NewPoll from "../components/pageComponents/Home/NewPoll";
import { AppMssgList } from "../components/formFuncs/formFuncs";
// import { AppNavBarHeader } from "../components/pageComponents/Other/miscPageComps";
import { PollWindow } from "../components/pageComponents/Other/pollComps";
import { runGraphQuery } from "../lib/apollo/miscFunctions";
import { PageForm } from "../components/layout/CompStyles";
import NavBar from "../components/pageComponents/Other/NavBar";
import {
  PollsAll,
  UserDataProps,
  PollHistory,
} from "../components/appTypes/appType";

const { GET_POLLS_ALL } = GraphResolvers.queries;

interface Props {
  data?: PollsAll;
}

const Home: NextPage<Props> = () => {
  const appContext = useAuth();
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_POLLS_ALL);
  const initialUserState: UserDataProps = {
    getUserData: {
      appToken: "",
      user: { _id: "", appid: "", email: "" },
    },
  };
  const [userData, setUserData] = useState<UserDataProps>(initialUserState);

  return (
    <PageForm title={`${router.pathname} Home`}>
      <NavBar updateUser={setUserData}/>
      <div className="p-3" style={{ backgroundColor: "#f4f4f4" }}>
        <h1>HOME PAGE</h1>
        {appContext && appContext.appMssgs.length > 0 && (
          <AppMssgList mssgs={appContext.appMssgs} />
        )}
        <PollWindow polls={data?.polls} />
        <Link href={"/Polls"}>
          <button type="submit" className="btn btn-primary">
            Polls Home Page
          </button>
        </Link>
      </div>
    </PageForm>
  );
};


export default Home;
