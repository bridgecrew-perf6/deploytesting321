import React from "react";
import { IProps } from "../appTypes/appType";
import NewPoll from "../pageComponents/Home/NewPoll";
import NavBar from "../pageComponents/Other/NavBar";
import AddTopic from "../pageComponents/Other/TopicWindow/addTopicForm";
import { PageForm } from "./CompStyles";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
<<<<<<< HEAD
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
// import { siteTime } from "_components/index";
import schedule from "node-schedule";
import NotificationWindow from "_components/pageComponents/Other/NavBar/NotificationWindow";
=======
>>>>>>> fa227085ca7cce700544ea24958a2017313b09db

// const { GET_NEWEST_POLLS, GET_ACTIVE_CHATS, GET_TRENDING_POLLS, GET_USER } =
//   GraphResolvers.queries;

export const SitePageContainer: React.FC<IProps> = (props: any) => {
  // const [siteTime, setSiteTime] = useState<siteTime>({
  //   hour: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  // const [userIdBefore, setUserId] = useState("");

  // const { data: appUserData } = useQuery(GET_USER, {
  //   onCompleted: (res) => {
  //     let time = res.getUserData.user.timeOnSite;
  //     setUserId(res.getUserData.user._id);
  //     setSiteTime({
  //       ...siteTime,
  //       seconds: time.seconds,
  //     });
  //   },
  // });

  // const [
  //   updateTimeOnSite,
  //   { loading: updateTimeLoading, error: updateTimeError },
  // ] = useMutation(GraphResolvers.mutations.UPDATE_TIME_ON_SITE);

  // useEffect(() => {
  //   let seconds = 0;
  //   let userId: string = userIdBefore;
  //   console.log("Started to calculate time");
  //   schedule.scheduleJob("*/1 * * * * *", () => {
  //     seconds = seconds + 1;
  //     if (userId) {
  //       if (seconds >= 60 && seconds > 0) {
  //         updateTimeOnSite({
  //           variables: {
  //             userId: userId,
  //             seconds: seconds,
  //           },
  //         });
  //         console.log("updateTime");
  //         seconds = 0;
  //       }
  //     }
  //   });
  // }, [siteTime]);

  return (
    <PageForm title={props.title}>
      {props.title !== "Admin Panel"} && <NewPoll />
      {props.title !== "Admin Panel"} && <AddTopic />
      <NavBar title={props.title} />
      {props.children}
    </PageForm>
  );
};
