import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NextPage } from "next";
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
import { UserDataProps } from "../components/appTypes/appType";

const { GET_POLLS_ALL } = GraphResolvers.queries;

const Home: NextPage = (props) => {
  const appContext = useAuth();
  // const { appMssgs } = useAuth();
  const router = useRouter();
  const initialUserState: UserDataProps = {
    getUserData: {
      appToken: "",
      user: { _id: "", userId: "", email: "" },
    },
  };
  const [userData, setUserData] = useState<UserDataProps>(initialUserState);

  return (
    <PageForm title={`${router.pathname} Home`}>
      <NavBar updateUser={setUserData} />
      <div className="p-3" style={{ backgroundColor: "#f4f4f4" }}>
        <h1>HOME PAGE</h1>
        <PollWindow />
        <Link href={"/Polls"}>
          <button type="submit" className="btn btn-primary">
            Polls Home Page
          </button>
        </Link>
        {appContext && appContext.appMssgs.length > 0 && (
          <AppMssgList mssgs={appContext.appMssgs} />
        )}
      </div>
    </PageForm>
  );
};

export default Home;

// export default function Home(props) {
//   const { appMssgs } = useAuth();
//   const router = useRouter();
//   const initialUserState = null;
//   const [userData, setUserData] = useState(initialUserState);

//   return (
//     <PageForm title={`${router.pathname} Home`}>
//       <NavBar updateUser={setUserData} />
//       <div className="p-3" style={{ backgroundColor: "#f4f4f4" }}>
//         <h1>HOME PAGE</h1>
//         <PollWindow />
//         <Link href={"/Polls"}>
//           <button type="submit" className="btn btn-primary">
//             Polls Home Page
//           </button>
//         </Link>
//         {appMssgs.length > 0 && <AppMssgList mssgs={appMssgs} />}
//       </div>
//     </PageForm>
//   );
// }

//Figure out how to use GetStaticProps instead of getServerSideProps
// export async function getServerSideProps({ req, res }) {
//   try {
//     const { data } = await runGraphQuery("query", GET_USER, req);
//     const { id, pollHistory, profilePic, email } = JSON.parse(data.getUserData);

//     return {
//       props: {
//         userData: { id, pollHistory, profilePic, email },
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         userData: { userError: err.message },
//       },
//     };
//   }
// }

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POLLS_ALL,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
