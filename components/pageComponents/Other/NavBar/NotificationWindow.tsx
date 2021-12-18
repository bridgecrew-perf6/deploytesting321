import styles from "../../../../appStyles/appStyles.module.css";
import windowStyles from "../../../../appStyles/windowStyles.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import { UserNotification } from "../../../appTypes/appType";
import React, { useEffect, useState } from "react";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import TimeAgo from "react-timeago";
import { BsThreeDots } from "react-icons/bs";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import { FaRegCheckCircle } from "react-icons/fa";
import { updateNotifications } from "../../../../lib/apollo/apolloFunctions";
import { useLazyQuery, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";

const {
  appColor,
  appbg_secondary,
  ctrBxShadow,
  formTxt,
  notifItem,
  iconHover,
  notifSubWindow,
} = styles;

interface NotificationWindow {
  // data: UserNotification[];
  userId: String;
}

const { GET_NOTIFICATIONS_WITH_PAGINATION } = GraphResolvers.queries;

const NotificationWindow = ({ userId }: NotificationWindow) => {
  // { data }: NotificationWindow

  // Hooks
  const router = useRouter();

  // States
  const [subWindow, toggleSubWindow] = useState(false);

  const [currentNotificationOffset, setCurrentNotificationOffset] =
    useState<number>(0);
  const [currentNotificationLimit, setCurrentNotificationLimit] =
    useState<number>(5);
  const [hasMoreNotifications, setHasMoreNotifications] =
    useState<boolean>(true);

  const [data, setData] = useState<Notification[]>([]);

  // Queries
  const {
    data: notifications,
    fetchMore,
    subscribeToMore,
    error: notificationError,
    loading: notificationLoading,
  } = useQuery(GET_NOTIFICATIONS_WITH_PAGINATION, {
    variables: {
      offset: currentNotificationLimit,
      limit: currentNotificationLimit,
    },
    onCompleted: (res) =>
      setDataForNotifications(res?.notificationsWithPagination),
  });

  // Mutations
  const [modifyNotifications, { data: updatedData, loading }] = useMutation(
    GraphResolvers.mutations.UPDATE_NOTIFICATION
  );

  // useEffects
  useEffect(() => {
    subscribeToMore({
      document: GraphResolvers.subscriptions.NOTIFICATION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newItem = subscriptionData.data.newNotification;

        if (newItem.user._id !== userId) {
          return Object.assign({}, prev, {
            notifications: [newItem, ...prev.notifications],
          });
        }
        return prev;
      },
    });
  }, []);

  // Other Functions
  const goToRoute = (routeId: string) => {
    router.push({
      pathname: `/Polls/${routeId}`,
    });

    ($("#notifWindow") as any).modal("hide"); //closes modal programitically
  };

  const changeNotifications = (changeId: string = "") => {
    let updatedData: string | string[];

    if (changeId) {
      updatedData = changeId;
    } else {
      updatedData = data.map((item: any) => item._id);
    }

    updateNotifications(modifyNotifications, updatedData);
  };

  const setDataForNotifications = (data: Notification[]) => {
    if (data.length < currentNotificationLimit) {
      setHasMoreNotifications(false);
    }

    setCurrentNotificationOffset((prevOffset) => {
      return prevOffset + currentNotificationLimit;
    });
    setData((prevData) => {
      return [...prevData, ...data];
    });
  };

  const fetchMoreNotificationsAndUpdateData = async () => {
    const res: any = await fetchMore({
      variables: {
        offset: currentNotificationOffset,
        limit: currentNotificationLimit,
      },
    });
    setDataForNotifications(res?.notificationsWithPagination);
  };

  return (
    <div
      className={`modal fade`}
      id="notifWindow"
      aria-labelledby="notifWindowLabel"
      aria-hidden="true"
      tabIndex={-1}
    >
      <div
        className={`modal-dialog modal-lg modal-dialog-scrollable position-relative ${windowStyles.notifWindow}`}
      >
        <div className="modal-content p-2">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className={formTxt}>Notifications</h5>
            <div
              className={`mr-2 ${iconHover} d-flex align-items-center justify-content-center`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleSubWindow(!subWindow)}
            >
              <BsThreeDots size={25} />
            </div>
          </div>
          {subWindow && <NotifSubWindow update={changeNotifications} />}
          <div className={"modal-body"}>
            <Scrollbars style={{ width: "100%", height: "95%" }}>
              <div className="mt-2">
                {
                  <InfiniteScroll
                    style={{ overflow: "hidden" }}
                    dataLength={data.length}
                    next={() => {
                      fetchMoreNotificationsAndUpdateData();
                    }}
                    scrollableTarget={"notifWindow"}
                    hasMore={hasMoreNotifications}
                    loader={
                      <>
                        {/* {console.log(pollData)} */}
                        {/* <AppLoadingLite /> */}
                        Loading From Infinite Scroll...
                      </>
                    }
                    scrollThreshold={-1}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Thats all thankyou !</b>
                      </p>
                    }
                  >
                    <div>
                      {data?.length > 0 ? (
                        data?.map((item: any) => (
                          <NotificationItem
                            key={item._id}
                            data={item}
                            nav={goToRoute}
                            changeNotification={changeNotifications}
                          />
                        ))
                      ) : (
                        <>No Notifications</>
                      )}
                    </div>
                  </InfiniteScroll>
                }

                {/* {!notificationLoading ? (
                  data?.length > 0 ? (
                    data?.map((item: any) => (
                      <NotificationItem
                        key={item._id}
                        data={item}
                        nav={goToRoute}
                        changeNotification={changeNotifications}
                      />
                    ))
                  ) : (
                    <h2>No new notification!</h2>
                  )
                ) : (
                  <p>Loading ...</p>
                )} */}
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
};
// const NotificationWindow = ({ data }: NotificationWindow) => {
//   const router = useRouter();

//   const [subWindow, toggleSubWindow] = useState(false);

//   const [modifyNotifications, { data: updatedData, loading }] = useMutation(
//     GraphResolvers.mutations.UPDATE_NOTIFICATION
//   );

//   const goToRoute = (routeId: string) => {
//     router.push({
//       pathname: `/Polls/${routeId}`,
//     });

//     ($("#notifWindow") as any).modal("hide"); //closes modal programitically
//   };

//   const changeNotifications = (changeId: string = "") => {
//     let updatedData: string | string[];

//     if (changeId) {
//       updatedData = changeId;
//     } else {
//       updatedData = data.map((item) => item._id);
//     }

//     updateNotifications(modifyNotifications, updatedData);
//   };

//   return (
//     <div
//       className={`modal fade`}
//       id="notifWindow"
//       aria-labelledby="notifWindowLabel"
//       aria-hidden="true"
//       tabIndex={-1}
//     >
//       <div
//         className={`modal-dialog modal-lg modal-dialog-scrollable position-relative ${windowStyles.notifWindow}`}
//       >
//         <div className="modal-content p-2">
//           <div className="d-flex align-items-center justify-content-between">
//             <h5 className={formTxt}>Notifications</h5>
//             <div
//               className={`mr-2 ${iconHover} d-flex align-items-center justify-content-center`}
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleSubWindow(!subWindow)}
//             >
//               <BsThreeDots size={25} />
//             </div>
//           </div>
//           {subWindow && <NotifSubWindow update={changeNotifications} />}
//           <div className={"modal-body"}>
//             <Scrollbars style={{ width: "100%", height: "95%" }}>
//               <div className="mt-2">
//                 {data?.map((item) => (
//                   <NotificationItem
//                     key={item._id}
//                     data={item}
//                     nav={goToRoute}
//                     changeNotification={changeNotifications}
//                   />
//                 ))}
//               </div>
//             </Scrollbars>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default NotificationWindow;

interface NotifSubWindow {
  update: (changeId?: string) => void;
}

const NotifSubWindow = ({ update }: NotifSubWindow) => {
  return (
    <div
      className={`position-absolute ${notifSubWindow} ${ctrBxShadow} p-2 mr-1`}
    >
      <span
        className="d-flex align-items-center w-100 p-1"
        onClick={() => update()}
      >
        <FaRegCheckCircle size={22} color="#969696" />
        <a
          className="ml-2 w-100 h-100 text-muted"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          Mark all as read
        </a>
      </span>

      <span
        className="d-flex align-items-center w-100 p-1"
        onClick={() => console.log("Notification Settings Page placeholder")}
      >
        <IoSettingsSharp size={22} color="#969696" />
        <a
          className="ml-2 w-100 h-100 text-muted"
          style={{ fontWeight: 500, textDecoration: "none" }}
        >
          Notification settings
        </a>
      </span>
    </div>
  );
};

interface NotificationItem {
  data: UserNotification;
  nav: (id: string) => void;
  changeNotification: (changeId?: string) => void;
}

const NotificationItem = ({
  data,
  nav,
  changeNotification,
}: NotificationItem) => {
  const imgIcon = data.user.profilePic ? (
    <img
      src={data.user.profilePic}
      className="rounded-circle"
      style={{ height: 50, width: 50 }}
    />
  ) : (
    <IoPersonCircle style={{ height: 50, width: 50 }} />
  );

  return (
    <div className={`d-flex ${notifItem} p-2 rounded align-items-center`}>
      <div style={{ width: "12%" }}>{imgIcon}</div>
      <div
        className="ml-3 text-muted d-flex flex-column p-1"
        style={{ width: "80%", cursor: "pointer" }}
        onClick={() => nav(data.notificationId)}
        // onClick={() => {
        //   if (data.notificationType === "poll") {
        //     nav(data.notificationId);
        //   }
        // }}
      >
        <span className="" style={{ fontSize: 14.5, fontWeight: 600 }}>
          {data.message}
        </span>
        <label className="mt-1" style={{ fontSize: 13 }}>
          <TimeAgo date={data.creationDate} live={false} />
        </label>
      </div>

      {!data.read && (
        <span
          onClick={() => changeNotification(data._id)}
          className={`rounded-circle ${appColor} mr-2`}
          style={{ height: 14, width: 15, cursor: "pointer" }}
        />
      )}
    </div>
  );
};
