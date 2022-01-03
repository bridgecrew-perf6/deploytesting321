import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Spinner,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { UserNotification } from "../../../appTypes/appType";
import { useQuery, useMutation } from "@apollo/client";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { updateNotifications } from "../../../../lib/apollo/apolloFunctions";
import TimeAgo from "react-timeago";
import { BsGearFill } from "react-icons/bs";
import { NotifySetting } from "./NotifySetting";

const { GET_NOTIFICATIONS_WITH_PAGINATION } = GraphResolvers.queries;
const NotificationContainer = ({ userId }: any) => {
  const {
    isOpen: settingIsOpen,
    onOpen: settingOnOpen,
    onClose: settingOnClose,
  } = useDisclosure();
  const [userNotifications, setNotifications] = useState<UserNotification[]>(
    []
  );
  const [offset, setOffset] = useState(0);
  const {
    data: notificationData,
    subscribeToMore,
    error: notificationError,
    fetchMore,
    loading: notifyLoading,
  } = useQuery(GET_NOTIFICATIONS_WITH_PAGINATION, {
    variables: {
      offset,
      limit: 10,
    },
    fetchPolicy: "network-only",
  });
  const paginateNotify = async () => {
    fetchMore({
      variables: {
        offset: notificationData?.notificationsWithPagination?.length,
        limit: 10,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        const previousEntry = previousResult?.notificationsWithPagination;
        const newProducts = fetchMoreResult?.notificationsWithPagination;
        return {
          offset: 10,
          notificationsWithPagination: [...previousEntry, ...newProducts],
        };
      },
    });
  };
  const [modifyNotifications, { data: updatedData, loading: updateLoading }] =
    useMutation(GraphResolvers.mutations.UPDATE_NOTIFICATION);

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
      updatedData = notificationData?.notificationsWithPagination.map(
        (item: any) => item._id
      );
    }

    updateNotifications(modifyNotifications, updatedData);
  };

  // console.log("updateLoading", updateLoading);

  return (
    <Flex justifyContent="flex-end" zIndex="999">
      <Box
        bg="gray.50"
        mr={[0, 0, 10]}
        borderRadius="lg"
        overflow="hidden"
        maxW="400px"
        w="100%"
        boxShadow={{
          base: "0 8px 10px -1px rgba(0,0,0,.1)",
          md: "0 1px 10px -1px rgba(0,0,0,.2)",
        }}
        h="700px"
        _focus={{ outline: "none" }}
        _active={{ outline: "none" }}
      >
        <SimpleBar
          style={{
            height: "100%",
            overflowX: "hidden",
            outline: "none !important",
          }}
        >
          <Box h="100%">
            <Box mt="4" mb="1" mx="4">
              <Flex align="center" justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  Notifcations
                </Text>
                <Flex align="center">
                  <Text
                    fontSize="sm"
                    color="blue.300"
                    mr="1"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => changeNotifications()}
                  >
                    Mark All as read
                  </Text>
                </Flex>
              </Flex>
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
              <Box>
                {notificationData?.notificationsWithPagination.map(
                  (notify: any) => (
                    <Box
                      py="3"
                      key={notify?._id}
                      px="4"
                      bg={notify.read ? "gray.50" : "gray.200"}
                      borderBottom="1px"
                      borderBottomColor="gray.300"
                    >
                      <Flex alignItems="center">
                        <Box>
                          <Link href={`/Profile/${notify?.user?.appid}`}>
                            <Avatar
                              name="xav dave"
                              src={notify?.user?.profilePic}
                              cursor="pointer"
                            />
                          </Link>
                        </Box>
                        <Flex direction="column" ml="4" w="100%">
                          <Text
                            fontSize="sm"
                            cursor="pointer"
                            _hover={{ color: "blue.400" }}
                          >
                            {notify?.message}
                          </Text>
                          <Flex align="center" justify="space-between">
                            <Text fontSize="xs" color="gray.500">
                              <TimeAgo
                                date={notify?.creationDate}
                                live={false}
                              />
                            </Text>
                            {!notify.read && (
                              <Text
                                fontSize="xs"
                                color="blue.400"
                                cursor="pointer"
                                mr="1"
                                _hover={{ textDecoration: "underline" }}
                                onClick={() => changeNotifications(notify._id)}
                              >
                                Mark as read
                              </Text>
                            )}
                          </Flex>
                        </Flex>
                      </Flex>
                    </Box>
                  )
                )}
                <Flex justify="center" align="center" py="2">
                  <Text
                    color="blue.400"
                    fontSize="xs"
                    cursor="pointer"
                    onClick={paginateNotify}
                  >
                    Load more
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>
        </SimpleBar>
      </Box>
      <NotifySetting isOpen={settingIsOpen} onClose={settingOnClose} />
    </Flex>
  );
};
export default NotificationContainer;
