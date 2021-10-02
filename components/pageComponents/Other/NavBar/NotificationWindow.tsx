import styles from "../../../../appStyles/appStyles.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import { UserNotification } from "../../../appTypes/appType";
import React, { useState } from "react";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import TimeAgo from "react-timeago";
import { BsThreeDots } from "react-icons/bs";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import { FaRegCheckCircle } from "react-icons/fa";
import { updateNotifications } from "../../../../lib/apollo/apolloFunctions/mutations";

const {
  appColor,
  appbg_secondary,
  ctrBxShadow,
  formTxt,
  notifItem,
  iconHover,
  notifSubWindow,
} = styles;

interface NotificationWindow {
  data: UserNotification[];
}

const NotificationWindow = ({ data }: NotificationWindow) => {
  const router = useRouter();

  const [subWindow, toggleSubWindow] = useState(false);

  const [modifyNotifications, { data: updatedData, loading }] = useMutation(
    GraphResolvers.mutations.UPDATE_NOTIFICATION
  );

  const goToRoute = (routeId: string) => {
    router.push({
      pathname: `/Polls/${routeId}`,
    });
  };

  const changeNotifications = (changeType: string) => {
    let updatedData: UserNotification[] = [];

    if (changeType === "all") {
      updatedData = data.map((item) => {
        return { ...item, read: true };
      });
    }

    updateNotifications(modifyNotifications, updatedData);
  };

  return (
    <div
      className={`position-absolute p-2 ${appbg_secondary} ${ctrBxShadow} rounded position-relative`}
      style={{ top: 90, right: 40, width: "25em", height: "70em" }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <h5 className={formTxt}>Notifications</h5>
        <div
          className={`mr-2 ${iconHover} d-flex align-items-center justify-content-center`}
          style={{ cursor: "pointer" }}
          onClick={() => toggleSubWindow(!subWindow)}
        >
          <BsThreeDots size={25} />
        </div>
      </div>
      {subWindow && <NotifSubWindow update={changeNotifications} />}
      <Scrollbars style={{ width: "100%", height: "95%" }}>
        <div className="mt-2">
          {data.map((item) => (
            <NotificationItem key={item._id} data={item} nav={goToRoute} />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default NotificationWindow;

interface NotifSubWindow {
  update: (changeType: string) => void;
}

const NotifSubWindow = ({ update }: NotifSubWindow) => {
  return (
    <div
      className={`position-absolute ${notifSubWindow} ${ctrBxShadow} p-2 mr-1`}
      style={{ right: 15, width: "50%", height: "8%", zIndex: 1 }}
    >
      <span
        className="d-flex align-items-center w-100 p-1"
        onClick={() => update("all")}
      >
        <FaRegCheckCircle size={22} color="#969696" />
        <a
          className="ml-2 w-100 h-100 text-muted"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          Mark all as read
        </a>
      </span>

      <span
        className="d-flex align-items-center w-100 p-1"
        onClick={() => console.log("Notification Settings Page placeholder")}
      >
        <IoSettingsSharp size={22} color="#969696" />
        <a
          className="ml-2 w-100 h-100 text-muted"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          Notification settings
        </a>
      </span>
    </div>
  );
};

interface NotificationItem {
  data: UserNotification;
  nav: (id: string) => void;
}

const NotificationItem = ({ data, nav }: NotificationItem) => {
  const imgIcon = data.user.profilePic ? (
    <img
      src={data.user.profilePic}
      className="rounded-circle"
      style={{ height: 50, width: 50 }}
    />
  ) : (
    <IoPersonCircle style={{ height: 50, width: 50 }} />
  );

  return (
    <div className={`d-flex ${notifItem} p-2 rounded align-items-center`}>
      <div style={{ width: "12%" }}>{imgIcon}</div>
      <div
        className="ml-3 text-muted d-flex flex-column p-1"
        style={{ width: "80%", cursor: "pointer" }}
        onClick={() => {
          if (data.notificationType === "poll") {
            nav(data.notificationId);
          }
        }}
      >
        <span className="" style={{ fontSize: 14.5, fontWeight: 600 }}>
          {data.message}
        </span>
        <label className="mt-1" style={{ fontSize: 13 }}>
          <TimeAgo date={data.creationDate} live={false} />
        </label>
      </div>

      {!data.read && (
        <span
          onClick={() => console.log("triggered")}
          className={`rounded-circle ${appColor} mr-2`}
          style={{ height: 14, width: 15, cursor: "pointer" }}
        />
      )}
    </div>
  );
};