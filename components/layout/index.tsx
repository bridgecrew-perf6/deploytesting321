import React from "react";
import { IProps } from "../appTypes/appType";
import NewPoll from "../pageComponents/Home/NewPoll";
import NavBar from "../pageComponents/Other/NavBar";
import AddTopic from "../pageComponents/Other/TopicWindow/addTopicForm";
import { PageForm } from "./CompStyles";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { useQuery } from "@apollo/client";

const { GET_NEWEST_POLLS, GET_ACTIVE_CHATS, GET_TRENDING_POLLS, GET_USER } =
  GraphResolvers.queries;

export const SitePageContainer: React.FC<IProps> = (props: any) => {
  
  // const { data: appUserData } = useQuery(GET_USER, {
  //   onCompleted: (res: any) => {
  //     console.log(res)
      
  //   },
  // });

  return (
    <PageForm title={props.title}>
      {props.title !== "Admin Panel"} && <NewPoll />
      {props.title !== "Admin Panel"} && <AddTopic />
      <NavBar title={props.title} />
      {props.children}
    </PageForm>
  );
};
