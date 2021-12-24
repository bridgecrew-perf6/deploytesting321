import { useLazyQuery, useQuery } from "@apollo/client";
import { ApolloError } from "apollo-server-errors";
import { GetStaticPaths, GetStaticProps } from "next";
import router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ProfileType, User } from "../../../components/appTypes/appType";
import { createAppMssgList } from "../../../components/formFuncs/miscFuncs";
import { CardForm } from "../../../components/layout/CompStyles";
import AppLoading from "../../../components/pageComponents/Other/Loading";
import {
  ProfileSideBar,
  ProfileHeader,
} from "../../../components/pageComponents/Profile";
import ProfileBody from "../../../components/pageComponents/Profile/ProfileBody";
import { initializeApollo } from "../../../lib/apollo";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useAuth } from "../../../components/authProvider/authProvider";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const apolloClient = initializeApollo();

const { GET_APPUSER, GET_USERPOLLS, GET_FAVORITES, GET_USER } =
  GraphResolvers.queries;

interface Profile {
  userId: string;
  // data: User | undefined;
  // error: string | undefined;
}

// const Profile = ({ data, error }: Profile) => {
const Profile = ({ userId }: Profile) => {
  const profileDataTypes: ProfileType[] = [
    { type: "My Polls", active: true, loading: false, data: [] },
    { type: "Favorites", active: false, loading: false, data: [] },
    { type: "Activity", active: false, loading: false, data: [] },
  ];
  //State
  const [profileItems, updateProfileItems] = useState(profileDataTypes);
  const appContext = useAuth();
  // console.log(appContext?.authState);
  //Api
  const [pollsByUser, { data: pollData, loading: pollLoading }] = useLazyQuery(
    GET_USERPOLLS,
    {
      onError: (e) => updateProfileType(0, "error", e.message),
    }
  );

  const [getFavorites, { data: favData, loading: favLoading }] = useLazyQuery(
    GET_FAVORITES,
    {
      fetchPolicy: "cache-and-network",
      onError: (e) => updateProfileType(1, "error", e.message),
    }
  );

  const [getAppUserData, { data }] = useLazyQuery(GET_APPUSER);

  useEffect(() => {
    if (userId) {
      console.log(userId, appContext?.authState);
      getAppUserData({ variables: { userId: userId } });
    }
  }, [userId]);

  useEffect(() => {
    if (data) {
      pollsByUser({ variables: { userId: data.getAppUserData._id } });
      getFavorites({ variables: { userId: data.getAppUserData._id } });

      const numCount = data.getAppUserData.favorites.length;
      updateProfileType(1, "numCount", numCount);

      if (favData) {
        updateProfileType(1, "data", favData.showFavorites);
        updateProfileType(1, "error", null);
      }
    }

    if (pollData) {
      const numCount = pollData.pollsByUser.length;
      updateProfileType(0, "data", pollData.pollsByUser);
      updateProfileType(0, "numCount", numCount);
      updateProfileType(0, "error", null);
    }
  }, [data, favData, pollData, profileItems]);

  //Functions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updateCategories = (id: number) => {
    let loading: boolean;

    if (id === 0) {
      loading = pollLoading;
    } else if (id === 1) {
      loading = favLoading;
    } else loading = true;

    const updatedCats = profileItems.map((item) => {
      return { ...item, active: false, loading };
    });

    updatedCats[id].active = true;
    updateProfileItems(updatedCats);
  };

  const clickHandler = (btnType: string) => {
    if (btnType === "Favorites") {
      getFavorites();
      updateCategories(1);
      return;
    }

    if (btnType == "Activity") {
      updateCategories(2);
      return;
    }

    data && pollsByUser({ variables: { userId: data._id } });
    updateCategories(0);
  };

  const updateProfileType = (idx: number, prop: string, val: any) => {
    let profileObj = profileItems[idx];
    profileObj = {
      ...profileObj,
      [prop as keyof ProfileType]: val,
    };
    const finalItems = profileItems;
    finalItems[idx] = profileObj;
    updateProfileItems(finalItems);
  };

  //Render

  if (data) {
    return (
      <CardForm ctrStyle={"90%"} title={`Profile`}>
        <ProfileHeader
          data={data.getAppUserData}
          handleProfile={() => handleSubmit}
        />
        <div className="d-flex justify-content-between">
          <div className="p-3" style={{ width: "30%" }}>
            <ProfileSideBar data={data.getAppUserData} />
          </div>
          <div className="d-flex pt-3 pb-3 pr-3" style={{ width: "70%" }}>
            <ProfileBody
              polls={pollData}
              favorites={favData}
              clickHandler={clickHandler}
              btns={profileItems}
            />
          </div>
        </div>
      </CardForm>
    );
  }

  return (
    <CardForm ctrStyle={"90%"} title={`Profile`}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <AppLoading
          style={{ height: "80px", width: "80px" }}
          message="Profile"
        />
      </div>
    </CardForm>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context?.params?.id;
  return {
    props: { userId },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await apolloClient.query({
    query: GraphResolvers.queries.GET_ALL_USERS,
  });

  const ids: string[] = res.data.users.map((user: User) => user.appid);

  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};
