import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
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
import { UserDataProps, UserNotification } from "../../../appTypes/appType";
import { createAppMssgList } from "../../../formFuncs/miscFuncs";
import { useAuth } from "../../../authProvider/authProvider";
import ProfileImg from "../../Profile/profileImg";
import AddTopic, { NewTopicBtn } from "../TopicWindow/addTopicForm";
import { AppLoadingLite } from "../Loading";
import { ToolTipCtr } from "../../../layout/customComps";
import NotificationWindow from "./NotificationWindow";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const { GET_USER, LOG_OUT, GET_NOTIFICATIONS, INTERNAL_USER_LOGOUT } =
  GraphResolvers.queries;
const {
  customBtn,
  customBtnOutline,
  customBtnOutlinePrimary,
  custombtnCreate,
} = btnStyles;

export default function ProfileHeader(props: any) {
  const router = useRouter();
  let cookie: any = Cookies.get("polditSession");
  const appContext = useAuth();
  // console.log(appContext?.authState);

  const [notification, toggleNotification] = useState(false);
  const [userNotifications, updateNotifications] = useState<UserNotification[]>(
    []
  );
  const [message, setMessage] = useState(false);

  // const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);
  const { data: notificationData, subscribeToMore } = useQuery(
    GET_NOTIFICATIONS,
    {
      onCompleted: (res) => updateNotifications(res.notifications),
    }
  );

  const [logout, {}] = useLazyQuery(LOG_OUT, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (appContext?.authState && notificationData && subscribeToMore) {
      const userId = appContext?.authState?.getUserData?.user._id;
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
  }, [appContext?.authState, notificationData]);

  const messageIcon = message ? (
    <AiFillMessage size={24} color="#ff4d00" />
  ) : (
    <AiOutlineMessage size={24} color="#ff4d00" />
  );

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
    Cookies.remove("polditSession");
    router.push(
      {
        pathname: "/Login",
        query: { appMssgs },
      },
      "/Login"
    );
  };
  const { title } = props;

  if (appContext?.authState && props.title !== "Admin Panel") {
    const { _id, appid, profilePic } = appContext?.authState.getUserData.user;
    const unreadNotifications = notificationData?.notifications.filter(
      (item: UserNotification) => !item.read
    ).length;

    const superUserList = process.env.NEXT_PUBLIC_SUPERUSERS?.split("_");

    return (
      <div
        className="d-flex form-row align-items-center justify-content-between pr-2 pl-1"
        style={{
          width: title !== "Admin Panel" ? "30%" : "22rem",
          marginLeft: 5,
        }}
      >
        <Link href="/newPoll">
          <div
            className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary} my-2 my-sm-0`}
            typeof="button"
            // data-toggle="modal"
            // data-target="#newPollModal"
          >
            Create New Poll
          </div>
        </Link>
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
            typeof="button"
            data-toggle="modal"
            data-target="#notifWindow"
          >
            {NotificationIcon}
            {unreadNotifications > 0 && (
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
        <NotificationWindow data={notificationData?.notifications} />
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

  if (
    appContext?.authState &&
    props.title !== "Admin Panel" &&
    !appContext?.authState
  ) {
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
      {props.title === "Admin Panel" ? (
        <div
          className="d-flex form-row align-items-center justify-content-between pr-2 pl-1"
          style={{
            width: title !== "Admin Panel" ? "30%" : "22rem",
            marginLeft: 5,
          }}
        >
          <React.Fragment>
            <div
              className={styles.cursor}
              onMouseEnter={() => setMessage(true)}
              onMouseLeave={() => setMessage(false)}
            >
              {messageIcon}
            </div>
            <button
              className={`${custombtnCreate} ${customBtnOutline}`}
              type="button"
              onClick={() => {
                Cookies.remove("polditSession");
                router.push("/Login");
              }}
            >
              Logout
            </button>
          </React.Fragment>

          <div>
            <ProfileImg
              profilePic={""}
              id={""}
              appId={""}
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
      ) : (
        <AppLoadingLite />
      )}
    </div>
  );
}
