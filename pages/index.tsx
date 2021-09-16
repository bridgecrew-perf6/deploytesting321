import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import GraphResolvers from "../lib/apollo/apiGraphStrings";
import { CustomBtn, PollHistory } from "../components/appTypes/appType";
import { SitePageContainer } from "../components/layout";
import { HomeBtnWindow } from "../components/pageComponents/Home";
import DataWindow from "../components/pageComponents/Home/DataWindow";

import AppLoading, {
  AppLoadingLite,
} from "../components/pageComponents/Other/Loading";
import { useAuth } from "../components/authProvider/authProvider";

const { GET_NEWEST_POLLS, GET_ACTIVE_CHATS, GET_TRENDING_POLLS } =
  GraphResolvers.queries;

const Home = () => {
  const router = useRouter();
  const auth = useAuth();

  const btnItems: CustomBtn[] = [
    { active: true, btnName: "Active Chats", data: [] },
    { active: false, btnName: "Trending Polls", data: [] },
    { active: false, btnName: "Newest Polls", data: [] },
  ];

  const [homeBtns, updateHomeBtns] = useState<CustomBtn[]>(btnItems);

  const { data: newPollData } = useQuery(GET_NEWEST_POLLS, {
    onCompleted: (res) => updateData("Newest Polls", res.newestPolls),
  });
  const { data: activeChats } = useQuery(GET_ACTIVE_CHATS, {
    onCompleted: (res) => updateData("Active Chats", res.activeChats),
  });
  const { data: trendingPolls } = useQuery(GET_TRENDING_POLLS, {
    onCompleted: (res) => updateData("Trending Polls", res.trendingPolls),
  });

  const updateBtnItem = (btnName: string, prop: string, val: any) => {
    const updatedItems = homeBtns.map((item) => {
      if (item.btnName === btnName && prop === "active") {
        const data = pollHandler(item.btnName);

        return { ...item, active: true, data };
      } else if (item.btnName !== btnName && prop === "active") {
        return { ...item, active: false };
      } else if (item.btnName === btnName && prop !== "active") {
        return { ...item, [prop as keyof CustomBtn]: val };
      } else {
        return item;
      }
    });

    updateHomeBtns(updatedItems);
  };

  const updateData = (btnType: string, data: PollHistory[]) => {
    const updatedHomeBtns = homeBtns.map((item) => {
      if (item.btnName === btnType) {
        return { ...item, data };
      }
      return item;
    });

    updateHomeBtns(updatedHomeBtns);
  };

  const pollHandler = (sortType: string) => {
    if (sortType === "Newest Polls" && newPollData) {
      return newPollData.newestPolls;
    }

    if (sortType === "Active Chats" && activeChats) {
      return activeChats.activeChats;
    }

    if (sortType === "Trending Polls" && trendingPolls) {
      return trendingPolls.trendingPolls;
    }
  };

  useEffect(() => {

    if (
      activeChats &&
      homeBtns[0].data.length !== activeChats.activeChats.length
    ) {
      updateData("Active Chats", activeChats.activeChats);
    }

    if (
      trendingPolls &&
      homeBtns[1].data.length !== trendingPolls.trendingPolls.length
    ) {
      updateData("Trending Polls", trendingPolls.trendingPolls);
    }

    if (
      newPollData &&
      homeBtns[2].data.length !== newPollData.newestPolls.length
    ) {
      updateData("Newest Polls", newPollData.newestPolls);
    }
  }, [
    activeChats,
    trendingPolls,
    newPollData,
    homeBtns[0].data.length,
    homeBtns[1].data.length,
    homeBtns[2].data.length,
  ]);

  const pollData = homeBtns.filter((item) => item.active);

  return (
    <SitePageContainer title={`${router.pathname} Home`}>
      <HomeBtnWindow btnList={homeBtns} update={updateBtnItem} />

      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "170px" }}
      >
        {pollData[0].data.length > 0 ? (
          <DataWindow data={pollData[0].data} />
        ) : (
          <AppLoadingLite />
        )}
      </div>
    </SitePageContainer>
  );
};

export default Home;
