import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../../appStyles/appStyles.module.css";
import pollStyles from "../../../appStyles/pollStyles.module.css";
import {
  Answer,
  ISubTopic,
  ITopic,
  PollHistory,
  SrchCustomBtn,
} from "../../appTypes/appType";
import { useAuth } from "../../authProvider/authProvider";
import { numCountDisplay } from "../../formFuncs/miscFuncs";
import { CustomBtn, ToolTipCtr } from "../../layout/customComps";
import { BtnItem } from "../Home";
import DataWindow from "../Home/DataWindow";
import { AppLoadingLite } from "../Other/Loading";
import { PollBtn } from "../Other/PollMetrics";
import ProfileImg from "../Profile/profileImg";

const { appColor, appbg_other, dataWindow, dataItem } = styles;
const { pollHeaderTxt, questionWindow } = pollStyles;

interface SearchBtns {
  data: SrchCustomBtn[];
  update: (btnName: string, prop: string, val: any) => void;
}

export const SearchBtns = ({ data, update }: SearchBtns) => {
  return (
    <div
      className={`alert alert-light ${questionWindow} justify-content-between`}
    >
      <h4 className={`${pollHeaderTxt} mb-4 w-100 text-center`}>
        SEARCH RESULTS
      </h4>
      <ul className="list-group list-group-horizontal d-flex w-100 justify-content-center">
        {data.map((item, idx) => (
          <SrchBtnItem key={idx} data={item} update={update} />
        ))}
      </ul>
    </div>
  );
};

interface SearchBtn {
  data: SrchCustomBtn;
  update: (btnName: string, prop: string, val: any) => void;
}

const SrchBtnItem = ({ data, update }: SearchBtn) => {
  let btnStyle: string;
  let numCtrStyle: string;

  if (data.active) {
    btnStyle = `btn ${appColor} border-0 text-white`;
    numCtrStyle = `rounded bg-light text-dark`;
  } else {
    btnStyle = `btn ${appbg_other} border-0`;
    numCtrStyle = `rounded border border-secondary text-muted`;
  }

  return (
    <div
      className={`btn ${btnStyle} m-2 d-flex justify-content-center`}
      style={{ width: 200 }}
      onClick={(e) => {
        e.preventDefault();
        update(data.btnName, "active", true);
      }}
    >
      <div className="w-100 position-relative">
        <a>{data.btnName}</a>
        {data.count > 0 && (
          <span
            className={`ml-4 ${numCtrStyle} p-1 pl-2 pr-2`}
            style={{ fontSize: 14, fontWeight: 600 }}
          >
            {numCountDisplay(data.count)}
          </span>
        )}
      </div>
    </div>
  );
};

interface SearchWindow {
  data: SrchCustomBtn | undefined;
}

export const SearchWindow = ({ data }: SearchWindow) => {
  if (data?.btnName === "Polls") {
    return <DataWindow data={data.data as PollHistory[]} />;
  }

  if (data?.btnName === "Answers") {
    return <AnswerWindow data={data.data as Answer[]} />;
  }

  if (data?.btnName === "SubTopics") {
    return <CategoryWindow data={data.data as ISubTopic[]} />;
  }

  if (data?.btnName === "Topics") {
    return <CategoryWindow data={data.data as ITopic[]} />;
  }

  return (
    <div
      className={`alert alert-light ${questionWindow} align-items-center p-5 w-100`}
    >
      <AppLoadingLite />
    </div>
  );
};

export const EmptyData = () => {
  return (
    <div
      className={`alert alert-light ${questionWindow} align-items-center p-5 w-100`}
    >
      No Search Results found
    </div>
  );
};

interface AnswerWindow {
  data: Answer[];
}

export const AnswerWindow = ({ data }: AnswerWindow) => {
  return (
    <div
      className={`alert alert-none d-flex align-items-center ${appbg_other} ${dataWindow}`}
    >
      <ul className=" d-flex list-group w-100">
        {data?.map((item) => (
          <AnswerItem data={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export const AnswerItem = ({ data }: { data: Answer }) => {
  return (
    <div className={`card m-2 ${dataItem} p-2`}>
      <p
        className={`${pollHeaderTxt} text-muted`}
        style={{ fontSize: 16, fontWeight: 700 }}
      >
        Poll Question
      </p>
      {data.poll && <p className="">{data.poll.question}</p>}
      <div className="border-top mt-2 pt-2">
        <p
          className={`${pollHeaderTxt} text-muted`}
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          Poll Answer
        </p>
        <div className="mt-3">
          <p>{data.answer}</p>
          <div className="d-flex align-items-center pt-3 pb-2">
            <div
              className="d-flex justify-content-center"
              style={{ width: "8%" }}
            >
              <ProfileImg
                profilePic={data.creator?.profilePic}
                id={data.creator?._id}
                appId={data.creator?.appid}
                picStyle={{ height: 50, width: 50 }}
                color="gray"
              />
            </div>
            <p className="">{data.creator?.appid}</p>
          </div>

          <AnswerBtnMetrics data={data} />
        </div>
      </div>
    </div>
  );
};

export const AnswerBtnMetrics = ({ data }: { data: Answer }) => {
  return (
    <div className="border-top mt-2 pt-2 d-flex justify-content-between">
      <div
        className="d-flex align-items-center justify-content-between text-muted"
        style={{ width: "18%", fontSize: 14, fontWeight: 500 }}
      >
        <div className="d-flex">
          <span className="mr-2">Likes</span>
          <span>{numCountDisplay(data.likes.length)}</span>
        </div>
        <div className="d-flex">
          <span className="mr-2">Dislikes</span>
          <span>{numCountDisplay(data.dislikes.length)}</span>
        </div>
      </div>
      {data.poll && <PollBtn pollId={data.poll._id} />}
    </div>
  );
};

interface CategoryWindow {
  data: any[];
}

export const CategoryWindow = ({ data }: CategoryWindow) => {
  const router = useRouter();

  const goToCatWithParams = (
    data: ISubTopic | ITopic
    // topicId: string,
    // subTopicId: string,
    // catVal: string
  ) => {
    // let topicId;
    // let subTopicId;

    // if (typeof data.topic === "string") {
    //   topicId = data._id;
    //   subTopicId = "All";
    // } else {
    //   topicId = data.topic._id;
    //   subTopicId = data._id;
    // }

    // auth?.handleSearch(JSON.stringify({ topicId, subTopicId }));
    router.push(
      { pathname: "/Polls", query: { data: JSON.stringify(data) } },
      "/Polls"
    );
  };

  return (
    <div
      className={`alert alert-none d-flex align-items-center ${appbg_other} ${dataWindow}`}
    >
      <ul className=" d-flex list-group w-100">
        {data?.map((item) => {
          let title: string;
          let catType: string;

          if (typeof item.topic === "string") {
            title = item.topic;
            catType = "Topic";
          } else {
            title = item.subTopic;
            catType = "Sub-Topic";
          }
          return (
            <CategoryItem
              key={item._id}
              title={title}
              data={item}
              catType={catType}
              description={item.description}
              pollCount={item.pollCount}
              goToPolls={goToCatWithParams}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface CategoryItem {
  title: string;
  data: ITopic | ISubTopic;
  catType: string;
  description: string;
  pollCount: number;
  goToPolls: (data: ISubTopic | ITopic) => void;
}

const CategoryItem = ({
  title,
  data,
  catType,
  description,
  pollCount,
  goToPolls,
}: CategoryItem) => {
  const btnString = pollCount === 1 ? "Poll" : "Polls";

  return (
    <div className={`card ${dataItem} m-2 p-2`}>
      {/* <Link href={`/Polls`}> */}
      <div className="card-header text-muted" onClick={() => goToPolls(data)}>
        <ToolTipCtr
          mssg={`Click to see all polls for ${title} ${catType}`}
          position="top"
          style={{
            bottom: "40px",
            left: "50%",
            width: 170,
          }}
        >
          <h5 className="card-title" style={{ cursor: "pointer" }}>
            {title}
          </h5>
        </ToolTipCtr>
      </div>
      {/* </Link> */}
      <div className="card-body">
        <p className="card-text mb-3">{description}</p>
      </div>
      <div className="card-footer">
        <p className="card-text">{`${numCountDisplay(
          pollCount
        )} ${btnString}`}</p>
      </div>
    </div>
  );
};
