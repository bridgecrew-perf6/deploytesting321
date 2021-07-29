import { useState } from "react";
import styles from "../../../appStyles/appStyles.module.css";
import { CustomBtn, PollHistory } from "../../appTypes/appType";
import { getSectionList } from "../../globalFuncs";

const { appColor, appbg_other, appbg_secondary, componentSpacer } = styles;

interface BtnItem {
  data: CustomBtn;

  update: (btnName: string, prop: string, val: any) => void;
}

interface CustomBtnList {
  btnList: CustomBtn[];
  update: (btnName: string, prop: string, val: any) => void;
}

interface HomeBtnWindow {
  sortPolls: (sortType: string) => void;
}

export const HomeBtnWindow = ({ sortPolls }: HomeBtnWindow) => {
  const btnItems: CustomBtn[] = [
    { active: true, btnName: "Active Chats" },
    { active: false, btnName: "Trending Polls" },
    { active: false, btnName: "Newest Polls" },
  ];

  const [homeBtns, updateHomeBtns] = useState<CustomBtn[]>(btnItems);

  const updateBtnItem = (btnName: string, prop: string, val: any) => {
    const updatedItems = homeBtns.map((item) => {
      if (item.btnName === btnName && prop === "active") {
        sortPolls(item.btnName);
        return { ...item, active: true };
      } else if (item.btnName !== btnName && prop === "active") {
        return { ...item, active: false };
      } else if (item.btnName === btnName && prop !== "active") {
        return { ...item, [prop as keyof CustomBtn]: val };
      } else {
        return item;
      }
    });

    updateHomeBtns(updatedItems);
  };

  return (
    <div className={`pb-2 ${appbg_other} ${componentSpacer} `}>
      <CustomList btnList={homeBtns} update={updateBtnItem} />
    </div>
  );
};

const CustomList = ({ btnList, update }: CustomBtnList) => {
  const finalBtnList = getSectionList(btnList, 4);

  return (
    <div className={`d-flex flex-column align-items-center ${appbg_secondary}`}>
      {finalBtnList.map((item, idx) => (
        <ul
          className="alert alert-light d-flex justify-content-between list-group list-group-horizontal"
          key={idx}
        >
          {item.map((subItem, subIdx) => (
            <BtnItem key={subIdx} data={subItem} update={update} />
          ))}
        </ul>
      ))}
    </div>
  );
};

export const BtnItem = ({ data, update }: BtnItem) => {
  const btnStyle = data.active
    ? `btn ${appColor} border-0 text-white`
    : `btn ${appbg_other} border-0`;

  return (
    <a
      href=""
      className={`btn ${btnStyle} m-2`}
      onClick={(e) => {
        e.preventDefault();
        update(data.btnName, "active", true);
      }}
    >
      {data.btnName}
    </a>
  );
};
