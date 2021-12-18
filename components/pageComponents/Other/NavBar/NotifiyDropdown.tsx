import { useState, useEffect } from "react";
import { Avatar, Box, Flex, Text, Spinner } from "@chakra-ui/react";
import Scrollbars from "react-custom-scrollbars-2";
import { UserNotification } from "../../../appTypes/appType";
import { useQuery, useMutation } from "@apollo/client";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { updateNotifications } from "../../../../lib/apollo/apolloFunctions";
import TimeAgo from "react-timeago";

const { GET_NOTIFICATIONS } = GraphResolvers.queries;
const NotificationContainer = ({ userId }: any) => {
  const [userNotifications, setNotifications] = useState<UserNotification[]>(
    []
  );
  const {
    data: notificationData,
    subscribeToMore,
    error: notificationError,
    loading: notifyLoading,
  } = useQuery(GET_NOTIFICATIONS, {
    onCompleted: (res) => setNotifications(res.notifications),
  });
  const [modifyNotifications, { data: updatedData, loading }] = useMutation(
    GraphResolvers.mutations.UPDATE_NOTIFICATION
  );
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
  const changeNotifications = (changeId: string = "") => {
    let updatedData: string | string[];

    if (changeId) {
      updatedData = changeId;
    } else {
      updatedData = notificationData?.notifications.map(
        (item: any) => item._id
      );
    }

    updateNotifications(modifyNotifications, updatedData);
  };

  return (
    <Flex justifyContent="flex-end" zIndex="999">
      <Box
        bg="#f2f2f2"
        mr={[0, 0, 10]}
        px="1"
        borderRadius="lg"
        maxW="400px"
        w="100%"
        boxShadow={{
          base: "0 8px 10px -1px rgba(0,0,0,.1)",
          md: "0 1px 10px -1px rgba(0,0,0,.2)",
        }}
        h="700px"
      >
        <Scrollbars style={{ height: "100%", overflowX: "hidden" }}>
          <Box h="100%">
            <Box mt="4" mb="1" ml="4">
              <Text fontWeight="bold" fontSize="lg">
                Notifcations
              </Text>
            </Box>
            {notifyLoading ? (
              <Flex h="80%" justify="center" align="center">
                <Spinner size="lg" color="poldit.100" />
              </Flex>
            ) : notificationError ? (
              <Flex h="80%" justify="center" align="center">
                <Text color="red.300" fontSize="sm" fontWeight="bold">
                  Error! Notifications failed.
                </Text>
              </Flex>
            ) : (
              notificationData?.notifications.map((notify: any) => (
                <Box
                  py="3"
                  key={notify?._id}
                  mx="3"
                  cursor="pointer"
                  px="4"
                  borderRadius="lg"
                  _hover={{ bg: "gray.300" }}
                >
                  <Flex alignItems="center">
                    <Box>
                      <Avatar name="xav dave" src={notify?.user?.profilePic} />
                    </Box>
                    <Flex direction="column" ml="4">
                      <Text fontSize="sm">{notify?.message}</Text>
                      <Text fontSize={["xs", "xs", "xs"]} color="gray.500">
                        <TimeAgo date={notify?.creationDate} live={false} />
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </Scrollbars>
      </Box>
    </Flex>
  );
};
export default NotificationContainer;
