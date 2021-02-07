import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { IoPersonCircle } from "react-icons/io5";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { profileIconCtr } from "../../../../appStyles/appStyles.module.css";
import { runGraphQuery } from "../../../../lib/apollo/miscFunctions";

const { GET_USER, LOG_OUT } = GraphResolvers.queries;

export default function ProfileHeader({ updateUser }) {
  const router = useRouter();

  const { data, error } = useQuery(GET_USER);
  const [logout, {}] = useLazyQuery(LOG_OUT);

  useEffect(() => {
    if (data) {
      updateUser(data.getUserData.user.pollHistory);
    }
  }, [data]);

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
    const { email, profilePic } = data.getUserData.user;
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
        style={{ width: "22%" }}
      >
        <label className="text-white">{email}</label>
        <div className={`d-flex ${profileIconCtr}`}>
          <a className="rounded-circle">
            {profileIcon}
            <ul>
              <Link href="/Profile">
                <li>Profile</li>
              </Link>
              <Link href="/">
                <li
                  onClick={() => {
                    logout();
                    router.reload();
                  }}
                >
                  Log Out
                </li>
              </Link>
            </ul>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
