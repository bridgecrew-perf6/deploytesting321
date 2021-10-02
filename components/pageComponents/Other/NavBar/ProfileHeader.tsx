import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { IoPersonCircle } from "react-icons/io5";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import styles from "../../../../appStyles/appStyles.module.css";
import btnStyles from "../../../../appStyles/btnStyles.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineNotification,
  AiFillNotification,
  AiFillMessage,
  AiOutlineMessage,
} from "react-icons/ai";
import NewPoll from "../../Home/NewPoll";
import { UserDataProps, UserNotification } from "../../../appTypes/appType";
import { createAppMssgList } from "../../../formFuncs/miscFuncs";
import { useAuth } from "../../../authProvider/authProvider";
import ProfileImg from "../../Profile/profileImg";
import AddTopic, { NewTopicBtn } from "../TopicWindow/addTopicForm";
import { AppLoadingLite } from "../Loading";
import { ErrorToast } from "../Error/Toast";
import { ToolTipCtr } from "../../../layout/customComps";
import NotificationWindow from "./NotificationWindow";

const { GET_USER, LOG_OUT, GET_NOTIFICATIONS } = GraphResolvers.queries;
const { customBtn, customBtnOutline, customBtnOutlinePrimary } = btnStyles;

export default function ProfileHeader() {
  const router = useRouter();

  const appContext = useAuth();

  const [notification, toggleNotification] = useState(false);
  const [userNotifications, updateNotifications] = useState<UserNotification[]>(
    []
  );

  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);
  const { data: notificationData, subscribeToMore } = useQuery(
    GET_NOTIFICATIONS,
    {
      onCompleted: (res) => updateNotifications(res.notifications),
    }
  );

  const [logout, {}] = useLazyQuery(LOG_OUT, { fetchPolicy: "network-only" });

  useEffect(() => {
    getUser();
    // appContext?.authState?.getUserData?.appToken !== "" && getUser();
    if (data) {
      appContext && appContext.updateUserData(data.getUserData);
    }
  }, [appContext, data]);

  useEffect(() => {
    if (data && notificationData && subscribeToMore) {
      const userId = data.getUserData.user._id;
      subscribeToMore({
        document: GraphResolvers.subscriptions.NOTIFICATION_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newItem = subscriptionData.data.newNotification;

          if (newItem.user._id !== userId) {
            return Object.assign({}, prev, {
              notifications: [...prev.notifications, newItem],
            });
          }
          return prev;
        },
      });
    }
  }, [data, notificationData]);

  const NotificationIcon = notification ? (
    <AiFillNotification size={28} color="#ff4d00" />
  ) : (
    <AiOutlineNotification size={28} color="#ff4d00" />
  );

  const handleLogOut = () => {
    const appMssgs = createAppMssgList([
      {
        message: "Logged Out.  Please Log In to see all your content.",
        msgType: 1,
      },
    ]);
    appContext && appContext.signOut();
    logout();

    router.push(
      {
        pathname: "/Login",
        query: { appMssgs },
      },
      "/Login"
    );
  };

  if (data) {
    const { _id, appid, profilePic } = data.getUserData.user;
    const unreadNotifications = notificationData?.notifications.filter(
      (item: UserNotification) => !item.read
    ).length;

    const superUserList = process.env.NEXT_PUBLIC_SUPERUSERS?.split("_");

    return (
      <div
        className="d-flex form-row align-items-center justify-content-between pr-2 pl-1"
        style={{ width: "30%" }}
      >
        <div
          className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
          typeof="button"
          data-toggle="modal"
          data-target="#newPollModal"
        >
          Create New Poll
        </div>
        {superUserList?.includes(appid) && (
          <>
            <NewTopicBtn />
          </>
        )}
        <ToolTipCtr
          mssg="Notifications"
          position="bottom"
          style={{ top: "35px", left: "50%" }}
        >
          <div
            className={`${styles.cursor} position-relative`}
            onClick={() => toggleNotification(!notification)}
          >
            {NotificationIcon}
            {!notification && unreadNotifications.length > 0 && (
              <div className="position-absolute" style={{ top: -15, left: 20 }}>
                <p
                  className={`rounded-circle ${styles.appColor} text-white p-1 pl-2 pr-2`}
                  style={{ fontSize: 13 }}
                >
                  {unreadNotifications}
                </p>
              </div>
            )}
          </div>
        </ToolTipCtr>
        {notification && <NotificationWindow data={userNotifications} />}
        <div>
          <ProfileImg
            profilePic={profilePic}
            id={_id}
            appId={appid}
            picStyle={{ height: 50, width: 50 }}
            color={"gray"}
          />
        </div>

        <div className="dropdown">
          <a
            className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
            type="button"
            id="siteDropDown"
            data-toggle="dropdown"
          >
            <GiHamburgerMenu
              size={22}
              aria-haspopup="true"
              aria-expanded="false"
            />
          </a>

          <div
            className={`dropdown-menu ${styles.dropDownCtr}`}
            aria-labelledby="siteDropDown"
          >
            <ul className="d-flex flex-column h-100 justify-content-center">
              <Link href={`/Profile/${appid}`}>
                {/* <Link href={{ pathname: "/Profile", query: { userId: _id } }}> */}
                <li className="dropdown-item">{`${appid} Profile`}</li>
              </Link>
              <Link href={`/Polls`}>
                <li className="dropdown-item">All Topics</li>
              </Link>
              <li className="dropdown-item">About</li>
              <li className="dropdown-item">How it Works</li>
              <li className="dropdown-item">Suggestions</li>
              <li className="dropdown-item">Support</li>
              <li className="dropdown-item">Settings</li>
              <li className="dropdown-item" onClick={() => handleLogOut()}>
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="form-row justify-content-between"
        style={{ width: "15%" }}
      >
        <Link href={"/Login"}>
          <button
            className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
            type="button"
          >
            Log In
          </button>
        </Link>
        <Link href={"/Registration"}>
          <button
            className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
            type="button"
          >
            Register
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center" style={{ width: 300 }}>
      <AppLoadingLite />
    </div>
  );
}
