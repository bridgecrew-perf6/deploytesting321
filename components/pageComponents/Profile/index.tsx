import styles from "../../../appStyles/appStyles.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";
import { Follower, GetAppUser, User } from "../../appTypes/appType";
import { MssgReadMoreLess } from "../../layout/customComps";
import { IoPersonCircle } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FiMinusSquare } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import Badge from "./Badge";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { Reference, StoreObject, useMutation } from "@apollo/client";
import { removeFollow } from "../../../lib/apollo/apolloFunctions/mutations";

const {
  appColor,
  appTxt,
  appImg,
  appbg_secondary,
  profileEditBtn,
  profilePageIcon,
  popup,
} = styles;

const { metricsBtn } = btnStyles;

interface ProfileData {
  data: User | undefined;
  handleProfile?: () => void;
  refresh?: () => void;
}

export const ProfileHeader = ({ data, handleProfile }: ProfileData) => {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-between ${appColor} text-white p-2`}
      style={{ height: "15vh", position: "relative" }}
    >
      <div className="">
        <h3 className={`${appTxt} ${appColor} text-white`}>
          {`${data?.firstname} ${data?.lastname}`}
        </h3>
      </div>
      <div className={`d-flex justify-content-center w-100`}>
        <ProfilePic profilePic={data?.profilePic} />
      </div>
      {data && data.isAppUser && (
        <>
          <div
            className={`rounded btn btn-outline-light ${profileEditBtn} m-2`}
            typeof="button"
            data-toggle="modal"
            data-target="#editProfileModal"
          >
            <BsPencilSquare
              style={{ height: "2vh", width: "auto", marginRight: "10px" }}
            />
            Edit Profile
          </div>
          <EditProfile user={data} />
        </>
      )}
    </div>
  );
};

interface ProfilePic {
  profilePic: string | undefined;
}

const ProfilePic = ({ profilePic }: ProfilePic) => {
  let appPic: any;

  if (profilePic) {
    appPic = (
      <img
        src={profilePic}
        alt="..."
        className={`${appImg} rounded-circle cursor`}
      />
    );
  } else appPic = <IoPersonCircle style={{ height: "100%", width: "auto" }} />;

  return (
    <div
      className={`${appColor} d-flex align-items-center justify-content-center rounded-circle ${profilePageIcon}`}
      style={{ height: "8.5vh" }}
    >
      {appPic}
    </div>
  );
};

export const ProfileSideBar = ({ data, refresh }: ProfileData) => {
  let mssg: string | undefined;

  if (
    (data && data.isAppUser && data.bio) ||
    (data && !data.isAppUser && data.bio)
  ) {
    mssg = data.bio;
  } else if (data && data.isAppUser && !data.bio) {
    mssg =
      "To tell us more about yourself, click on Edit Profile and complete the About Me section.";
  }

  return (
    <div className={`card ${appbg_secondary} h-100`}>
      <div className="card-body d-flex flex-column justify-content-between">
        {/* <Badge /> */}
        <div className="">
          <h5 className="card-title">About Me</h5>

          <MssgReadMoreLess mssg={mssg ? mssg : ""} />
        </div>
        <ProfileMetrics data={data} refresh={refresh} />
      </div>
      {/* <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div> */}
    </div>
  );
};

interface Metrics {
  title: string;
  count: number | undefined;
  showData: boolean;
  details?: Follower[];
}

const ProfileMetrics = ({ data }: ProfileData) => {
  //Once data is fed from DB, that data will be parsed here to make the list. This is a placeholder

  const [unfollow] = useMutation(GraphResolvers.mutations.REMOVE_FOLLOW);

  const initialMetrics: Metrics[] = [
    { title: "Chat Discussions", count: 0, showData: false },
    {
      title: "Following",
      count: 0,
      showData: false,
      details: [],
    },
    { title: "Followers", count: 0, showData: false },
  ];

  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    if (data) {
      const updatedMetrics = metrics.map((item) => {
        if (item.title === "Following") {
          item.count = data.following?.length;
          item.details = data.following;
          return item;
        }
        return item;
      });
      setMetrics(updatedMetrics);
    }
  }, [data]);

  const handleFollow = (userId: string) => {
    removeFollow(unfollow, userId);
  };

  const updateMetrics = (idx: number, prop: string, val: any) => {
    const updatedMetrics = metrics.map((item, index) =>
      idx === index ? { ...item, [prop as keyof Metrics]: val } : item
    );
    setMetrics(updatedMetrics);
  };

  return (
    <div>
      <ul className="list-group">
        {metrics.map((item, idx) => (
          <li
            className="list-group-item"
            style={{ cursor: "pointer" }}
            key={idx}
          >
            <div
              className={`d-flex justify-content-between text-muted ${metricsBtn}`}
            >
              <p
                className="font-weight-bold"
                onClick={() => updateMetrics(idx, "showData", !item.showData)}
              >
                {item.title}
              </p>
              <p className="font-weight-bold">{item.count}</p>
            </div>
            {item.showData && item.details && item.details.length > 0 && (
              <MetricWindow details={item.details} unfollow={handleFollow} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface MetricWindow {
  details: Follower[];
  unfollow: (userId: string) => void;
}

export const MetricWindow = ({ details, unfollow }: MetricWindow) => {
  return (
    <div className="list-group mt-3 border border-secondary p-1 overflow-auto">
      {details.map((item) => (
        <div key={String(item._id)} className="d-flex justify-content-between">
          <small className="font-weight-bold text-muted">{item.appId}</small>
          <FiMinusSquare
            style={{ height: 20, width: 20, color: "red" }}
            onClick={() => unfollow(item.appId)}
          />
        </div>
      ))}
    </div>
  );
};
