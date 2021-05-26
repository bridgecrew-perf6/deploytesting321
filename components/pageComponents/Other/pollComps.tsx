import React, { useEffect, useState } from "react";
import Link from "next/link";
import appStyles from "../../../appStyles/appStyles.module.css";
import PollMetrics from "./PollMetrics";
import { PollHistory, PollsAll, SliderSettings } from "../../appTypes/appType";
import { SubTopicTags } from "./TopicWindow/other";
import DataSlider from "../Slider";

export const PollWindow = ({ polls }: PollsAll) => {
  const settings: SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container-fluid d-flex flex-column border border-primary">
      <h2>Trending Polls</h2>
      <DataSlider settings={settings}>
        {polls?.map((item) => (
          <PollItem poll={item} key={item._id} />
        ))}
      </DataSlider>
    </div>
  );
};

interface PollItem {
  poll: PollHistory;
}

const PollItem = ({ poll }: PollItem) => {
  const answerCount = poll.answers.length;

  return (
    <Link href={`/Polls/${poll._id}`}>
      <div
        className={`card m-2 ${appStyles.cursor}`}
        style={{ height: "30vh" }}
      >
        <h5 className="card-header bg-secondary text-white text-center">
          {poll.topic.topic}
        </h5>
        <SubTopicTags data={poll.subTopics} />
        <div className="card-body">
          <p
            className="card-text text-secondary"
            style={{ height: "10vh", fontSize: 13 }}
          >
            {poll.question}
          </p>
        </div>
        <div className="card-footer text-muted bg-white">
          <p
            className="card-text text-secondary"
            style={{ fontSize: 13 }}
          >{`posted by ${poll?.creator?.appid}`}</p>
          <PollMetrics created={poll.creationDate} numAnswers={answerCount} />
        </div>
      </div>
    </Link>
  );
};
