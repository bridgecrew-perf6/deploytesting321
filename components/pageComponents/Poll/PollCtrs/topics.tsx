import React, { useState } from "react";
import { CategoryItems, ITopic, PollsWindow } from "../../../appTypes/appType";
import { getAlphabeticalList, getSectionList } from "../../../globalFuncs";
import styles from "../../../../appStyles/appStyles.module.css";
import { ToolTipCtr } from "../../../layout/customComps";

const { appbg_secondary, appColor, appbg_other } = styles;



export const CustomTopicList = ({
  data,
//   loadPolls,
  select,
}: PollsWindow) => {
  //   const dataWithStatus = data.map((item) => {
  //     return { ...item, active: false };
  //   });

  //   const dataSorted = getAlphabeticalList(dataWithStatus, "topic");

  //   const [btnList, updateBtnList] = useState(dataSorted);

  const topicSectionList = getSectionList(data, 6);

  //   const handleBtn = (topic: string, prop: string, val: any) => {
  //     const updatedItems = btnList.map((item) => {
  //       if (item.topic === topic && prop === "active") {
  //         select(item._id);
  //         return { ...item, active: true };
  //       } else if (item.topic !== topic && prop === "active") {
  //         return { ...item, active: false };
  //       } else if (item.topic === topic && prop !== "active") {
  //         return { ...item, [prop as keyof ITopic]: val };
  //       } else {
  //         return item;
  //       }
  //     });

  //     updateBtnList(updatedItems);
  //   };

  return (
    <div
      className={`d-flex flex-column align-items-center ${appbg_secondary} w-100`}
    >
      {topicSectionList.map((item, idx) => (
        <ul
          className="alert alert-light d-flex justify-content-between list-group list-group-horizontal"
          key={idx}
        >
          {item.map((subItem, subIdx) => (
            <TopicItem
              key={subIdx}
              data={subItem}
              select={select}
            //   loadPolls={loadPolls}
            />
          ))}
        </ul>
      ))}
    </div>
  );
};

interface TopicItem {
  data: CategoryItems;
  select: (activeId: string, catType: string) => void;
//   loadPolls: (catType: string, catId: string) => void;
}

// const TopicItem = ({ data, select, loadPolls }: TopicItem) => {
    const TopicItem = ({ data, select }: TopicItem) => {
  const btnStyle = data.active
    ? `btn ${appColor} border-0 text-white`
    : `btn ${appbg_other} border-0 text-muted`;

  return (
    <div>
      <ToolTipCtr
        mssg={data.description ? data.description : "Poll Topic"}
        position="bottom"
        style={{ top: "60px", left: "50%" }}
      >
        <a
          href=""
          className={`btn ${btnStyle} m-2`}
          onClick={(e) => {
            e.preventDefault();
            select(data._id, "topic");
            // handleBtn(data.category, "active", true);
            // loadPolls("topic", data._id);
          }}
        >
          <h5>{data.category}</h5>
        </a>
      </ToolTipCtr>
    </div>
  );
};
