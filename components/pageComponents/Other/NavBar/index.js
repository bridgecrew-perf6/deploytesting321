import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import {
  appColor,
  searchBar,
} from "../../../../appStyles/appStyles.module.css";
import { Logo } from "../../../layout/branding";
import ProfileHeader from "./ProfileHeader";

export default function NavBar(props) {
  const router = useRouter();

  const goToSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.length > 0) {
        router.push(
          { pathname: "/Search", query: { searchVal: e.target.value } },
          "/Search"
        );
      }
    }
  };

  return (
    <nav className={`navbar ${appColor}`}>
      <Link href={"/"}>
        <a className="navbar-brand" href="#">
          <Logo />
        </a>
      </Link>
      <div
        className="form-row justify-content-between"
        style={{ width: "55%" }}
      >
        <div className={`input-group ${searchBar}`}>
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
      <ProfileHeader {...props} />
    </nav>
  );
}
