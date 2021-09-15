import React, { ReactNode, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconType } from "react-icons/lib";
import carouselStyles from "../../../appStyles/carouselStyles.module.css";
import { SliderSettings } from "../../appTypes/appType";

const {
  carouselCtr,
  customNextArrow,
  customPrevArrow,
  customDots,
  pageBtns,
  pageBtn,
  customPgStyle,
} = carouselStyles;

interface DataSlider {
  settings: SliderSettings;
  children: ReactNode;
}

const DataSlider = ({ settings, children }: DataSlider) => {
  const sliderSettings = {
    ...settings,
    // appendDots,
    // customPaging,
    nextArrow: <SliderArrow type="right" />,
    prevArrow: <SliderArrow type="left" />,
    dotsClass: `${customPgStyle}`,
    // dotsClass: `${pageBtns} border border-primary`,
    // dotsClass: `slick-dots ${customDots}`,
  };

  return (
    <div className={`${carouselCtr}`}>
      <Slider {...sliderSettings}>{children}</Slider>
    </div>
  );
};

export default DataSlider;

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

// const appendDots = (vals: React.ReactElement[]) => {
//   return (
//     <div className={``}>
//       <ul className={``}>{vals}</ul>
//     </div>
//   );
// };

// const customPaging = (i: number) => {
//   return <div className={``}>{`${i + 1}`}</div>;
// };
