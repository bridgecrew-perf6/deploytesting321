import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { IoPersonCircle } from "react-icons/io5";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import {
  profileIconCtr,
  cursor,
  dropDownCtr,
} from "../../../../appStyles/appStyles.module.css";
import { runGraphQuery } from "../../../../lib/apollo/miscFunctions";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineNotification, AiFillNotification } from "react-icons/ai";
import NewPoll from "../../Home/NewPoll";
import AppDropdown from "../Dropdown";
import Backdrop from "../Backdrop";

const { GET_USER, LOG_OUT } = GraphResolvers.queries;

export default function ProfileHeader({ updateUser }) {
  const router = useRouter();

  const { data, error } = useQuery(GET_USER);
  const [logout, {}] = useLazyQuery(LOG_OUT);
  const [notification, toggleNotification] = useState(false);

  useEffect(() => {
    if (data) {
      updateUser(data.getUserData.user.pollHistory);
    }
  }, [data]);

  const NotificationIcon = notification ? (
    <AiFillNotification size={24} color="white" />
  ) : (
    <AiOutlineNotification size={24} color="white" />
  );

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
    const { userId, profilePic } = data.getUserData.user;
    const picStyle = { height: 50, width: 50 };

    const profileIcon =
      profilePic?.length > 0 ? (
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
          type="button"
          data-toggle="modal"
          data-target="#newPollModal"
        >
          Create New Poll
        </div>
        <div
          className={cursor}
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
          <a className={`rounded-circle ${profileIconCtr}`}>{profileIcon}</a>
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
            className={`dropdown-menu ${dropDownCtr}`}
            aria-labelledby="siteDropDown"
          >
            <ul className="d-flex flex-column h-100 justify-content-center">
              <Link href={"/Profile"}>
                <li className="dropdown-item">{`${userId} Profile`}</li>
              </Link>
              <li className="dropdown-item">All Topics</li>
              <li className="dropdown-item">About</li>
              <li className="dropdown-item">How it Works</li>
              <li className="dropdown-item">Suggestions</li>
              <li className="dropdown-item">Support</li>
              <li className="dropdown-item">Settings</li>
              <Link href="/">
                <li
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                    router.reload();
                  }}
                >
                  Log Out
                </li>
              </Link>
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
