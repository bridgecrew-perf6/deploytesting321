import React, { useEffect, useState } from "react";
import {
  CategoryItems,
  ISubTopic,
  PollsWindow,
} from "../../../appTypes/appType";
import { getAlphabeticalList, getSectionList } from "../../../globalFuncs";
import styles from "../../../../appStyles/appStyles.module.css";
import windowStyles from "../../../../appStyles/windowStyles.module.css";
import { ToolTipCtr } from "../../../layout/customComps";
import { filterSearchVals } from "../../../formFuncs/miscFuncs";
import { SearchBar } from "../../Home/newPollComps";
import AppLoading, { AppLoadingLite } from "../../Other/Loading";

const { appbg_secondary, appColor, appbg_other } = styles;
const {subTopicWindow} = windowStyles

// interface CustomSubTopicList {
//   data: ISubTopic[];
//   loadPolls: (catType: string, catId: string) => void;
//   topic: string;
// }

export const CustomSubTopicList = ({ data, loading, select }: PollsWindow) => {
  // export const CustomSubTopicList = ({
  //   data,
  //   loadPolls,
  //   select,
  //   topic,
  // }: PollsWindow) => {
  //   const [btnList, updateBtnList] = useState<any[]>([]);

  //   useEffect(() => {
  //     // const allBtn: ISubTopic = {
  //     //   ...data[0],
  //     //   _id: "All_1",
  //     //   subTopic: "All",
  //     //   description: "All SubTopics",
  //     //   active: true,
  //     // };

  //     let dataWithStatus = topic
  //       ? data.filter((item) => item.topic._id === topic)
  //       : data;

  //     dataWithStatus = dataWithStatus.map((item) => {
  //       return { ...item, active: false };
  //     });

  //     // dataWithStatus = [allBtn, ...dataWithStatus];

  //     const sortedData = getAlphabeticalList(dataWithStatus, "subTopic");
  //     updateBtnList(sortedData);
  //   }, [data, topic]);

  const topicSectionList = getSectionList(data, 5);

  //   const handleBtn = (subTopic: string, prop: string, val: any) => {
  //     const updatedItems = btnList.map((item) => {
  //       if (item.subTopic === subTopic && prop === "active") {
  //         return { ...item, active: true };
  //       } else if (item.subTopic !== subTopic && prop === "active") {
  //         return { ...item, active: false };
  //       } else if (item.subTopic === subTopic && prop !== "active") {
  //         return { ...item, [prop as keyof ISubTopic]: val };
  //       } else {
  //         return item;
  //       }
  //     });

  //     updateBtnList(updatedItems);
  //   };

  if (loading) {
    return (
      <div className={`${appbg_secondary} w-100`}>
        <AppLoadingLite />
        {/* <AppLoading message="Sub-Topics"
            style={{ height: "50px", width: "50px" }}  /> */}
      </div>
    );
  }

  return (
    <div className={`${appbg_secondary} w-100`} >
      <div className={`d-flex flex-column align-items-center`}>
        {topicSectionList.length > 0 ? (
          topicSectionList.map((item, idx) => (
            <ul
              className="alert alert-light d-flex justify-content-between list-group list-group-horizontal"
              key={idx}
            >
              {item.map((subItem, subIdx) => (
                <SubTopicItem
                  key={subIdx}
                  data={subItem}
                  select={select}
                  //   loadPolls={loadPolls}
                />
              ))}
            </ul>
          ))
        ) : (
          <div className="pt-5">
            <p>
              No Sub topics were found for this Topic. You can create new sub
              topics for this topic by creating new polls!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface SubTopicItem {
  data: CategoryItems;
  select: (activeId: string, catType: string) => void;
  //   loadPolls: (catType: string, catId: string) => void;
}

// const SubTopicItem = ({ data, select, loadPolls }: SubTopicItem) => {
const SubTopicItem = ({ data, select }: SubTopicItem) => {
  const btnStyle = data.active
    ? `btn ${appColor} text-white`
    : `btn ${appbg_other} text-muted`;

  return (
    <div
      className={`btn ${btnStyle} d-flex align-items-center justify-content-center m-2`}
      onClick={(e) => {
        e.preventDefault();
        select(data._id, "subTopic");
        // loadPolls("subTopic", data._id);
      }}
    >
      <ToolTipCtr
        mssg={data.description ? data.description : "Poll Sub-Topic"}
        position="bottom"
        style={{ top: "40px", left: "50%" }}
      >
        <span>{data.category}</span>
      </ToolTipCtr>
    </div>
  );
};
