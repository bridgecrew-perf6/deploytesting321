import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../../../appStyles/appStyles.module.css";
<<<<<<< HEAD
// import { NavBarProps } from "../../../appTypes/appType";
=======
import { NavProps } from "../../../appTypes/appType";
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
import { Logo } from "../../../layout/branding";
import ProfileHeader from "./ProfileHeader";
import { SearchBar } from "./searchBar";

<<<<<<< HEAD
const NavBar: React.FC = (props) => {
  const router = useRouter();
=======
const NavBar: React.FC<NavProps> = (props) => {
  const router = useRouter();
  const { title } = props;
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5

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
<<<<<<< HEAD
    <nav className={`navbar ${styles.appbg_secondary} ${styles.header_fixed}`}>
=======
    <nav
      className={`navbar ${styles.appbg_secondary} ${styles.header_fixed}`}
      // style={{ display: "flex", justifyContent: "space-between" }}
    >
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
      <Link href={"/"}>
        <a className="navbar-brand" href="#">
          <Logo />
        </a>
      </Link>
      <SearchBar search={goToSearch} style={{ width: "48%" }} />
<<<<<<< HEAD
      <ProfileHeader />
=======
      <ProfileHeader title={title} />
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
    </nav>
  );
};

export default NavBar;
