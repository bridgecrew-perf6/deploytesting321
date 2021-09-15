import TimeAgo from "react-timeago";
import React, { useEffect, useState } from "react";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import styles from "../../../appStyles/appStyles.module.css";
import {
  PollHistory,
  ProfileType,
  UserFavorites,
} from "../../appTypes/appType";
import AppLoading from "../Other/Loading";
import Link from "next/link";
import { numCountDisplay } from "../../formFuncs/miscFuncs";
import { AiTwotoneBoxPlot } from "react-icons/ai";
import { ToolTipCtr } from "../../layout/customComps";

const {
  cursor,
  appbg_secondary,
  appbg_other,
  profileTypeBtn,
  profileTypeBtn_active,
  dataItem,
  miniBtn,
  answerBtnMuted,
} = styles;

interface ProfileBody {
  polls: PollHistory[];
  favorites: UserFavorites;
  clickHandler: (btnType: string) => void;
  btns: ProfileType[];
}

interface ProfileBtns {
  clickHandler: (btnType: string) => void;
  items: ProfileType[];
}

interface DataWindow {
  data: PollHistory[] | UserFavorites;
  windowType: string;
  error: string | undefined | null;
}

interface DataItem {
  item: PollHistory;
  itemType: string;
}

const ProfileBody = ({ polls, favorites, clickHandler, btns }: ProfileBody) => {
  const { active, data, type, error } = btns.filter((item) => item.active)[0];

  return (
    <div className={`card ${appbg_other} w-100`}>
      <div className="card-body">
        <ProfileBtns clickHandler={clickHandler} items={btns} />
      </div>
      <div className="h-100">
        {active && <DataWindow data={data} windowType={type} error={error} />}
      </div>
    </div>
  );
};

export default ProfileBody;

const ProfileBtns = ({ clickHandler, items }: ProfileBtns) => {
  const btnActive = (id: number) => {
    return items[id].active ? profileTypeBtn_active : profileTypeBtn;
  };

  return (
    <ul className="list-group list-group-horizontal justify-content-between">
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`list-group-item d-flex justify-content-between align-items-center mr-2 rounded-pill ${btnActive(
            idx
          )}`}
          onClick={() => clickHandler(item.type)}
          style={{ width: "35%" }}
        >
          {item.type}
          {item.loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <span className="badge">{item.numCount}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

const DataWindow = ({ data, windowType, error }: DataWindow) => {
  const sectionData = Array.isArray(data) ? data : data.favoritePolls;

  return (
    <div className={`d-flex h-100 ${appbg_other}`}>
      {error ? (
        <div className="d-flex p-3 align-items-center justify-content-center">
          <p className="text-center">{error}</p>
        </div>
      ) : (
        <ul className="list-group w-100">
          {sectionData.map((item) => (
            <DataItem item={item} key={item._id} itemType={windowType} />
          ))}
        </ul>
      )}
    </div>
  );
};

const DataItem = ({ item, itemType }: DataItem) => {
  const answerCount = numCountDisplay(item.answers.length);

  return (
    <Link href={`/Polls/${item._id}`}>
      <div className={`bg-white m-2 d-flex p-2 ${dataItem} ${cursor}`}>
        <div className="col-8 border-right">
          <div
            className="d-flex align-items-center pt-2"
            style={{ height: "120px" }}
          >
            <p>{item.question}</p>
          </div>

          <div className="d-flex justify-content-around p-2">
            <div className="d-flex">
              <ToolTipCtr
                mssg="Poll Chat Messages"
                position="bottom"
                style={{ bottom: "-35px", left: "50%" }}
              >
                <BsFillChatSquareDotsFill size={25} color="#acacac" />
              </ToolTipCtr>
              <a className="ml-2" style={{ fontWeight: 600 }}>
                {item.chatMssgs ? item.chatMssgs.length : 0}
              </a>
            </div>

            <div className="d-flex">
              <ToolTipCtr
                mssg="Poll Answers"
                position="bottom"
                style={{ bottom: "-35px", left: "50%" }}
              >
                <a className={`${answerBtnMuted} rounded text-white`}>A</a>
              </ToolTipCtr>
              <a className="ml-2" style={{ fontWeight: 600, marginTop: "1px" }}>
                {answerCount}
              </a>
            </div>
          </div>
        </div>

        <div className="col p-0 pl-2">
          {itemType === "Favorites" && (
            <a className="d-flex justify-content-end">{`Created by ${item.creator?.appid}`}</a>
          )}
          <a className="d-flex justify-content-end mt-1">
            <TimeAgo date={item.creationDate} live={false} />
          </a>

          <div className="d-flex flex-column mt-2">
            <div className="d-flex flex-row">
              <ToolTipCtr
                mssg="Poll Topic"
                position="top"
                style={{ bottom: "55px", left: "50%" }}
              >
                <p
                  className={`p-1 text-white ${miniBtn} rounded cursor`}
                  style={{ backgroundColor: "#ff6961" }}
                >
                  {item.topic.topic}
                </p>
              </ToolTipCtr>
            </div>
            <div className="d-flex flex-wrap">
              {item.subTopics.map((item) => (
                <ToolTipCtr
                  mssg="Poll SubTopic"
                  position="bottom"
                  key={item._id}
                  style={{ bottom: "-20px", left: "50%" }}
                >
                  <p className={`mr-1 ${miniBtn} text-white p-1 rounded`}>
                    {item.subTopic}
                  </p>
                </ToolTipCtr>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
