import React, { useEffect, useState } from "react";
import styles from "../../../../appStyles/appStyles.module.css";
import pollStyles from "../../../../appStyles/pollStyles.module.css";
import {
  CategoryItems,
  ISubTopic,
  ITopic,
  PollsWindow,
} from "../../../appTypes/appType";
import { filterSearchVals } from "../../../formFuncs/miscFuncs";
import { SearchBar } from "../../Home/newPollComps";
import { BiReset } from "react-icons/bi";

import AppLoading from "../../Other/Loading";
import { CustomSubTopicList } from "./subTopics";
import { CustomTopicList } from "./topics";
import { ToolTipCtr } from "../../../layout/customComps";

const { questionWindow, pollHeaderTxt } = pollStyles;
const { appColor } = styles;

export const PollsTopicWindow = ({ data, select }: PollsWindow) => {
  return (
    <div
      className={`alert alert-light ${questionWindow} justify-content-between`}
    >
      <h5 className={`${pollHeaderTxt} mb-4 w-100 text-center`}>POLL TOPICS</h5>
      {data ? (
        <CustomTopicList data={data} select={select} />
      ) : (
        <AppLoading
          message="Topics"
          style={{ height: "30px", width: "30px" }}
        />
      )}
    </div>
  );
};

export const PollsSubTopicWindow = ({
  data,
  loading,
  search,
  select,
}: PollsWindow) => {
  // export const PollsSubTopicWindow = ({
  //   data,
  //   loadPolls,
  //   select,
  //   topic,
  // }: PollsWindow) => {
  //   const [subTopics, setSubTopics] = useState<CategoryItems[]>([]);

  //   useEffect(() => {
  //     data && setSubTopics(data);
  //   }, [data, subTopics]);

  return (
    <div
      className={`alert alert-light ${questionWindow} justify-content-between`}
    >
      <div className="w-100 position-relative">
        <h5
          className={`${pollHeaderTxt} w-100 text-center pt-2 `}
          style={{ height: "38px" }}
        >
          POLL SUB-TOPICS
        </h5>
      </div>
      <div
        className="d-flex justify-content-end position-absolute"
        style={{ width: "97%", top: "8px" }}
      >
        {/* <ToolTipCtr
          mssg="Show All Polls"
          position="right"
          style={{ bottom: 0, left: "95px" }}
        >
          <div
            className={`rounded ${appColor}`}
            style={{ padding: "5px", cursor: "pointer" }}
            onClick={() => loadPolls("subTopic", "All_1")}
          >
            <BiReset size={20} color={"white"} />
          </div>
        </ToolTipCtr> */}
        <div className="pt-2">
          {search && <SearchBar width="25vh" search={search} />}
        </div>
      </div>

      <CustomSubTopicList
        data={data}
        loading={loading}
        //   loadPolls={loadPolls}
        select={select}
      />

      {/* <CustomSubTopicList
        data={subTopics}
        loadPolls={loadPolls}
        topic={topic}
      /> */}
      {/* {subTopics.length > 0 ? (
        <CustomSubTopicList
          data={subTopics}
          loadPolls={loadPolls}
          topic={topic}
        />
      ) : (
        <AppLoading
          message="Sub-Topics"
          style={{ height: "30px", width: "30px" }}
        />
      )} */}
    </div>
  );
};

export const ErrorWindow = ({ mssg }: { mssg: string }) => {
  return (
    <div
      className={`alert alert-light ${questionWindow} justify-content-between align-items-center`}
    >
      <p>{mssg}</p>
    </div>
  );
};
