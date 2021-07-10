import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../../../appStyles/appStyles.module.css";
// import { NavBarProps } from "../../../appTypes/appType";
import { Logo } from "../../../layout/branding";
import ProfileHeader from "./ProfileHeader";
import { SearchBar } from "./searchBar";

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
    <nav className={`navbar ${styles.appbg_secondary} ${styles.header_fixed}`}>
      <Link href={"/"}>
        <a className="navbar-brand" href="#">
          <Logo />
        </a>
      </Link>
      <SearchBar search={goToSearch} style={{ width: "48%" }} />
      <ProfileHeader />
    </nav>
  );
};

export default NavBar;
