import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import styles from "../../../appStyles/appStyles.module.css";

interface ProfileImg {
  profilePic: string | null | undefined;
  id: string | null | undefined;
  appId: string | null | undefined;
  picStyle: { height: number; width: number };
  color?: string;
}

export default function ProfileImg({
  profilePic,
  id,
  appId,
  picStyle,
  color,
}: ProfileImg) {
  const router = useRouter();
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
    console.log(appId);

  return (
    <Link href={`/Profile/${appId}`}>
      <div
        className={`rounded-circle ${styles.profileIconCtr}`}
        // onClick={() => appId && routeHandler()}
      >
        <a>{profileIcon}</a>
      </div>
    </Link>
  );
}
