import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../../../appStyles/appStyles.module.css";
// import { NavBarProps } from "../../../appTypes/appType";
import { Logo } from "../../../layout/branding";
import ProfileHeader from "./ProfileHeader";

const NavBar: React.FC = (props) => {
  const router = useRouter();

  const goToSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    const { target } = e as React.ChangeEvent<HTMLInputElement>;

    if (key === "Enter" && target.value.length > 0) {
      e.preventDefault();
      router.push(
        { pathname: "/Search", query: { searchVal: target.value } },
        "/Search"
      );
    }
  };

  return (
    <nav className={`navbar ${styles.appColor}`}>
      <Link href={"/"}>
        <a className="navbar-brand" href="#">
          <Logo />
        </a>
      </Link>
      <div
        className="form-row justify-content-between"
        style={{ width: "48%" }}
      >
        <div className={`input-group ${styles.searchBar} bg-white align-items-center rounded`}>
          <div className="input-group-prepend overflow-hidden">
            <span
              className="input-group-text bg-white border border-white p-1"
              id="basic-addon1"
            >
              <BiSearchAlt
                style={{
                  color: "gray",
                  height: 23,
                  width: 23,
                }}
              />
            </span>
          </div>
          <input
            type="search"
            className="form-control border border-white"
            placeholder="Search"
            aria-label="Search"
            onKeyDown={goToSearch}
          />
        </div>
      </div>
      <ProfileHeader />
    </nav>
  );
};

export default NavBar;
