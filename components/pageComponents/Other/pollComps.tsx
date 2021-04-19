import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselStyles from "../../../appStyles/carouselStyles.module.css";
import appStyles from "../../../appStyles/appStyles.module.css";
import PollMetrics from "./PollMetrics";
import { IconType } from "react-icons/lib";
import { PollHistory, PollsAll } from "../../appTypes/appType";
import { SubTopicTags } from "./TopicWindow/other";

const {
  carouselCtr,
  customNextArrow,
  customPrevArrow,
  customDots,
} = carouselStyles;

export const PollWindow = ({ polls }: PollsAll) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SliderArrow type="right" />,
    prevArrow: <SliderArrow type="left" />,
    dotsClass: `slick-dots ${customDots}`,
  };

  return (
    <div className="container-fluid d-flex flex-column border border-primary">
      <h2>Trending Polls</h2>
      <div className={`${carouselCtr}`}>
        <Slider {...settings}>
          {polls?.map((item) => (
            <PollItem poll={item} key={item._id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

interface PollItem {
  poll: PollHistory;
}

const PollItem = ({ poll }: PollItem) => {
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
          <p className="card-text text-secondary" style={{ height: "10vh", fontSize:13 }}>
            {poll.question}
          </p>
        </div>
        <div className="card-footer text-muted bg-white">
          <p
            className="card-text text-secondary"
            style={{ fontSize: 13 }}
          >{`posted by ${poll?.creator?.appid}`}</p>
          <PollMetrics created={poll.creationDate} />
        </div>
      </div>
    </Link>
  );
};

//Find correct types.  Defaulted to any to bypass error
const SliderArrow = (props: any) => {
  const { className, style, onClick, type } = props;

  let PollArrow: IconType | undefined;
  let arrowClassName: string;

  if (type === "left") {
    PollArrow = IoIosArrowBack;
    arrowClassName = customPrevArrow;
  } else {
    PollArrow = IoIosArrowForward;
    arrowClassName = customNextArrow;
  }

  return (
    <div className={`${arrowClassName}`} onClick={onClick}>
      {PollArrow && <PollArrow style={{ color: "gray" }} size="25px" />}
    </div>
  );
};
