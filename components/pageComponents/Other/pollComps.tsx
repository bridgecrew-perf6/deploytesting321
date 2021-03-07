import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@apollo/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../appStyles/carouselStyles.module.css";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import PollMetrics from "./PollMetrics";
import { IconType } from "react-icons/lib";
import { PollHistory, PollsAll } from "../../appTypes/appType";

const { GET_POLLS_ALL } = GraphResolvers.queries;

const { carouselCtr, customNextArrow, customPrevArrow, customDots } = styles;

export const PollWindow = () => {
  const { data, error } = useQuery<PollsAll>(GET_POLLS_ALL);

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

  if (data) {
    return (
      <div className="container-fluid d-flex flex-column border border-primary">
        <h2>Trending Polls</h2>
        <div className={`${carouselCtr}`}>
          <Slider {...settings}>
            {data.polls.map((item) => (
              <PollItem poll={item} key={item._id} />
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  if (error) {
    <div className="container-fluid d-flex flex-column border border-primary">
      {error.message}
    </div>;
  }

  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

interface PollItem {
  poll: PollHistory;
}

const PollItem = ({ poll }: PollItem) => {
  return (
    <div className="card m-2">
      <h5 className="card-header bg-secondary text-white text-center">
        {poll.topic}
      </h5>
      <div className="card-body">
        <p className="card-text text-secondary" style={{ height: "10vh" }}>
          {poll.question}
        </p>
        <PollMetrics created={poll.creationDate} />
      </div>
    </div>
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
