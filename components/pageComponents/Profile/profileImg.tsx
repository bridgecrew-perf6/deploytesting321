import React from "react";
import Link from "next/link";
import { IoPersonCircle } from "react-icons/io5";
import styles from "../../../appStyles/appStyles.module.css";

interface ProfileImg {
  profilePic: string | null | undefined;
  picStyle: { height: number; width: number };
  color?: string;
}

export default function ProfileImg({
  profilePic,
  picStyle,
  color,
}: ProfileImg) {
  const profileIcon =
    profilePic && profilePic.length > 0 ? (
      <img
        src={profilePic}
        alt="..."
        className="rounded-circle"
        style={picStyle}
      />
    ) : (
      <IoPersonCircle style={{ ...picStyle, color }} />
    );

  return (
    <Link href={"/Profile"}>
      <a className={`rounded-circle ${styles.profileIconCtr}`}>{profileIcon}</a>
    </Link>
  );
}
