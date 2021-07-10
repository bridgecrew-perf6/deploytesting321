import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../appStyles/appStyles.module.css";
import { PollHistory, SliderSettings } from "../../appTypes/appType";
import PollMetrics from "../Other/PollMetrics";
import { TagWindow, UserTagWindow } from "../Other/Tags/Tags";

const { appColor, appbg_other, appbg_secondary, dataWindow, dataItem } = styles;

interface DataWindow {
  data: PollHistory[];
}

const DataWindow = ({ data }: DataWindow) => {
  return (
    <div
      className={`alert alert-none d-flex align-items-center ${appbg_other} ${dataWindow}`}
    >
      <ul className=" d-flex list-group w-100">
        {data?.map((item) => (
          <ListItem data={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default DataWindow;

interface ListItem {
  data: PollHistory;
}

const ListItem = ({ data }: ListItem) => {
  const imgSettings: SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: 0, left: -5 }}>
        <ul>{dots}</ul>
      </div>
    ),
    arrows: false,
  };

  return (
    <div className={`card m-2 ${dataItem}`} key={data._id}>
      <div className="">
        <div className="d-flex flex-row justify-content-between w-100 border-bottom p-2">
          <TagWindow
            pollId={data._id}
            topic={data.topic.topic}
            subTopics={data.subTopics}
          />
          <UserTagWindow user={data.creator} createdDate={data.creationDate} />
        </div>

        <p className="mt-3 mb-3 p-2 pl-3">{data.question}</p>
      </div>
      {data.pollImages && data.pollImages.length > 0 && (
        <div
          className={`d-flex flex-column align-items-center justify-content-center p-2 ${appbg_other}`}
        >
          <ImgSlider settings={imgSettings}>
            {data.pollImages.map((item, idx) => (
              <div
                className={`d-inline-flex justify-content-center pt-2 pb-4`}
                key={idx}
              >
                <img
                  src={item}
                  style={{
                    height: "20vh",
                    width: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </ImgSlider>
        </div>
      )}
      <div className={`p-2 m-2 ${appbg_secondary}`}>
        <PollMetrics data={data} />
      </div>
    </div>
  );
};

interface ImgSlider {
  settings: SliderSettings;
  children: ReactNode;
}

const ImgSlider = ({ settings, children }: ImgSlider) => {
  return (
    <div style={{ width: "90%" }}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
