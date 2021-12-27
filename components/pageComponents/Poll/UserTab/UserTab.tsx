import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars-2";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BiErrorCircle, BiMessage } from "react-icons/bi";

import { ChatUser } from "_components/appTypes/appType";
import { followHandler } from "lib/apollo/apolloFunctions/mutations";
import { useEffect } from "react";

interface UserTab {
  appUser: string;
  pollId: string | string[] | undefined;
}

export const UserTab = ({ appUser, pollId }: UserTab) => {
  const {
    data: userList,
    loading: userListLoading,
    error: userListError,
    subscribeToMore,
  } = useQuery(GraphResolvers.queries.GET_POLL_CHAT_USERS, {
    variables: { pollId },
  });

  const [toggleFollow] = useMutation(GraphResolvers.mutations.HANDLE_FOLLOW);

  useEffect(() => {
    subscribeToMore({
      document: GraphResolvers.subscriptions.POLL_CHAT_USER_SUBSCRIPTION,
      variables: { pollId },
      updateQuery: (prev, { subscriptionData }) => {
        // console.log("prev: ", prev);
        // console.log("sub Data: ", subscriptionData);
        const newUser: ChatUser = subscriptionData.data.newChatUser;
        if (!subscriptionData) return prev;

        const existingUser = (prev.pollChatUsers as ChatUser[]).some(
          (user: ChatUser) => user.id === newUser.id
        );

        if (!existingUser)
          return Object.assign({}, prev, {
            pollChatUsers: [...prev.pollChatUsers, newUser],
          });

        return prev;

        // if (newChatItem.poll._id === pollId) {
        //   console.log("new chat item: ", newChatItem);
        // }
      },
    });
  }, []);

  // useEffect(() => {
  //   subscribe({
  //     document: GraphResolvers.subscriptions.CHAT_SUBSCRIPTION,
  //     variables: { pollId },
  //     updateQuery: () => {},
  //   });
  // }, []);

  const handleFollow = (user: ChatUser) => {
    followHandler(toggleFollow, JSON.stringify(user));
  };

  if (userListLoading) {
    return (
      <Box>
        <Flex align="center" justify="center" minH="600px">
          <Spinner size="lg" />
        </Flex>
      </Box>
    );
  }
  if (userListError) {
    return (
      <Box>
        <Flex align="center" justify="center" minH="600px">
          <Flex justify="center" direction="column" align="center">
            <BiErrorCircle color="#718096" size="26px" />
            <Text color="gray.500" mt="2" fontSize="sm">
              Error! Cannot load Users.
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  }
  return (
    <Box bg="white" overflowX="hidden">
      <Scrollbars style={{ height: "845px" }}>
        {userList?.pollChatUsers &&
          userList?.pollChatUsers.map((x: any) => (
            <UserListItem
              key={x.id}
              user={x}
              handleFollow={handleFollow}
              appUser={appUser}
            />
          ))}
      </Scrollbars>
    </Box>
  );
};

interface UserListItem {
  user: ChatUser;
  handleFollow: (user: ChatUser) => void;
  appUser: string;
}

const UserListItem = ({ user, handleFollow, appUser }: UserListItem) => {
  const isAppUser = appUser === user.id;

  return (
    <Box bg="#f2f2f2" my="2" mx={[1, 1, 3]} borderRadius="lg">
      <Flex py="4" px={[1, 1, 4]} align="center" justify="space-between">
        <Flex align="center">
          {!isAppUser ? (
            <Tooltip
              hasArrow
              placement="top"
              label={!user.isFollowed ? "Follow" : "Unfollow"}
            >
              <IconButton
                icon={
                  !user.isFollowed ? (
                    <AiOutlinePlusCircle size="23px" />
                  ) : (
                    <AiOutlineMinusCircle size="23px" />
                  )
                }
                onClick={() => handleFollow(user)}
                aria-label="thumbsup"
                variant="ghost"
                _focus={{ outline: "none" }}
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                size="sm"
                color="gray.800"
              />
            </Tooltip>
          ) : (
            <Box mr="32px" />
          )}
          <Box mx="3" position="relative">
            <Link href={`/Profile/${user.appid}`}>
              <Avatar
                name="xav dave"
                src={user?.profilePic}
                size="md"
                cursor="pointer"
              />
            </Link>
            <Box
              position="absolute"
              w="9px"
              h="9px"
              borderRadius="50%"
              bg={user?.isActive ? "green.300" : "gray.400"}
              top="2px"
              right="3px"
            ></Box>
          </Box>
          <Box>
            <Text
              color="gray.600"
              fontSize={["sm", "sm", "md"]}
              maxW="80px"
              isTruncated
            >
              {user?.appid}
            </Text>
          </Box>
        </Flex>
        <Flex align="center">
          <Tooltip hasArrow placement="top" label="Polls">
            <Flex align="center" minW="60px">
              <Image src="/P-10.png" w="20px" />
              <Text color="gray.600" ml="2" fontSize={["xs", "xs", "sm"]}>
                {user?.numPolls}
              </Text>
            </Flex>
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Answers">
            <Flex align="center" ml="6" minW="60px">
              <BiMessage size="20px" />
              <Text color="gray.600" ml="2" fontSize={["xs", "xs", "sm"]}>
                {user?.numAnswers}
              </Text>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};
