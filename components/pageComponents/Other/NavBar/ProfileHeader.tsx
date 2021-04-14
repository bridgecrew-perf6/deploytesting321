import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { IoPersonCircle } from "react-icons/io5";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import styles from "../../../../appStyles/appStyles.module.css";
import { runGraphQuery } from "../../../../lib/apollo/miscFunctions";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineNotification, AiFillNotification } from "react-icons/ai";
import NewPoll from "../../Home/NewPoll";
import { UserDataProps } from "../../../appTypes/appType";
import { createAppMssgList } from "../../../formFuncs/miscFuncs";
import { useAuth } from "../../../authProvider/authProvider";

const { GET_USER, LOG_OUT } = GraphResolvers.queries;

export default function ProfileHeader() {
  const router = useRouter();

  const appContext = useAuth();

  const { data, error } = useQuery<UserDataProps>(GET_USER);
  const [logout, {}] = useLazyQuery(LOG_OUT, { fetchPolicy: "network-only" });
  const [notification, toggleNotification] = useState(false);

  useEffect(() => {
    if (data) {
      appContext && appContext.updateUserData(data.getUserData);
    }
  }, [data]);

  const NotificationIcon = notification ? (
    <AiFillNotification size={24} color="white" />
  ) : (
    <AiOutlineNotification size={24} color="white" />
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

  if (error) {
    return (
      <div
        className="form-row justify-content-between"
        style={{ width: "15%" }}
      >
        <Link href={"/Login"}>
          <button className="btn btn-outline-light my-2 my-sm-0" type="button">
            Log In
          </button>
        </Link>
        <Link href={"/Registration"}>
          <button className="btn btn-outline-light my-2 my-sm-0" type="button">
            Register
          </button>
        </Link>
      </div>
    );
  }

  if (data) {
    const { appid, profilePic } = data.getUserData.user;
    const picStyle = { height: 50, width: 50 };

    const profileIcon =
      profilePic && profilePic.length > 0 ? (
        <img
          src={profilePic}
          alt="..."
          className="rounded-circle"
          style={picStyle}
        />
      ) : (
        <IoPersonCircle style={{ ...picStyle, color: "white" }} />
      );

    return (
      <div
        className="d-flex form-row align-items-center justify-content-between pr-2 pl-1"
        style={{ width: "30%" }}
      >
        <div
          className="btn btn-outline-light my-2 my-sm-0"
          typeof="button"
          data-toggle="modal"
          data-target="#newPollModal"
        >
          Create New Poll
        </div>
        <div
          className={styles.cursor}
          onMouseEnter={() => toggleNotification(true)}
          onMouseLeave={() => toggleNotification(false)}
        >
          {NotificationIcon}
        </div>
        <Link href={"/Profile"}>
          {/* <Link
          href={{
            pathname: "/Profile",
            query: { data: JSON.stringify(data.getUserData) },
          }}
          as="/Profile"
        > */}
          <a className={`rounded-circle ${styles.profileIconCtr}`}>
            {profileIcon}
          </a>
        </Link>
        <div className="dropdown">
          <a
            className="btn btn-outline-light my-2 my-sm-0"
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
              <Link href={"/Profile"}>
                <li className="dropdown-item">{`${appid} Profile`}</li>
              </Link>
              <li className="dropdown-item">All Topics</li>
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
        <NewPoll />
      </div>
    );
  }

  return (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// export default ProfileHeader;
