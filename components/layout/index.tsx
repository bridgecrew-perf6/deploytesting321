import React from "react";
import { IProps } from "../appTypes/appType";
import NewPoll from "../pageComponents/Home/NewPoll";
import NavBar from "../pageComponents/Other/NavBar";
import AddTopic from "../pageComponents/Other/TopicWindow/addTopicForm";
import { PageForm } from "./CompStyles";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import MyNavbar from "_components/pageComponents/Other/NavBar/MyNavbar";

export const SitePageContainer: React.FC<IProps> = (props: any) => {
  return (
    <PageForm title={props.title} customStyle={props.customStyle || {}}>
      {/*
		<NewPoll />
		<AddTopic />
		<NavBar title={props.title} />
	*/}
      <MyNavbar />
      {props.children}
    </PageForm>
  );
};
