import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/authProvider/authProvider";
import { runGraphQuery } from "../../lib/apollo/miscFunctions";
import { CardForm } from "../../components/layout/CompStyles";
import {
  ProfileHeader,
  ProfileBody_Card,
} from "../../components/pageComponents/Profile";
import { useQuery } from "@apollo/client";
import { User } from "../../components/appTypes/appType";
import { createAppMssgList } from "../../components/formFuncs/miscFuncs";

const { GET_USER } = GraphResolvers.queries;

const Profile = () => {
  const { data, error, loading } = useQuery<User>(GET_USER);

  const router = useRouter();

  const [edit, handleEdit] = useState(false);

  const handleImage = () => {
    console.log("pic triggered");
  };

  if (error) {
    const appMssgs = createAppMssgList([
      { message: error.message, msgType: 0 },
    ]);

    router.push(
      {
        pathname: "/Login",
        query: { appMssgs },
      },
      "/Login"
    );
  }

  if (loading) {
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }
  return (
    <CardForm ctrStyle={"90%"} title={router.pathname}>
      <ProfileHeader data={data} handleImg={() => handleImage} />
      <div className="p-3" style={{ width: "35%" }}>
        <ProfileBody_Card data={data} edit={() => handleEdit(!edit)} />
      </div>
    </CardForm>
  );
};

export default Profile;