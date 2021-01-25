import { useState } from "react";
import { cursor } from "../../appStyles/appStyles.module.css";

export const MssgReadMoreLess = ({ mssg }) => {
  const [readMore, toggleReadMore] = useState(false);

  const finalMssg =
    mssg.length >= 180 && !readMore ? `${mssg.slice(0, 200)} ...` : mssg;

  return (
    <div className="">
      {finalMssg}
      {mssg.length >= 180 && !readMore && (
        <div className={`${cursor} pt-1`} onClick={() => toggleReadMore(true)}>
          <p className="card-text font-weight-normal text-primary">Read More</p>
        </div>
      )}
      {finalMssg && readMore && (
        <div
          className={`${cursor} pt-1`}
          onClick={() => {
            toggleReadMore(false);
          }}
        >
          <p className="font-weight-normal text-primary">Read Less</p>
        </div>
      )}
    </div>
  );
};
