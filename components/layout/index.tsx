import React from "react";
import { IProps } from "../appTypes/appType";
import NewPoll from "../pageComponents/Home/NewPoll";
import NavBar from "../pageComponents/Other/NavBar";
import { PageForm } from "./CompStyles";

export const SitePageContainer: React.FC<IProps> = (props) => {
  return (
    <PageForm title={props.title}>
      <NewPoll />
      <NavBar />
      {props.children}
    </PageForm>
  );
};
