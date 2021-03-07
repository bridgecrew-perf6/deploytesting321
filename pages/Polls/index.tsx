import React from "react";
import Link from "next/link";
import { useAuth } from "../../components/authProvider/authProvider";
import NewPoll from "../../components/pageComponents/Home/NewPoll";
import { AppMssgList } from "../../components/formFuncs/formFuncs";
import styles from "../../appStyles/appStyles.module.css";
// import { AppNavBarHeader } from "../../components/pageComponents/Other/miscPageComps";

export default function PollsHome() {
  const appContext = useAuth();

  return (
    <div>
      {/* <AppNavBarHeader /> */}
      Polls Page Placeholder
    </div>
  );
}
