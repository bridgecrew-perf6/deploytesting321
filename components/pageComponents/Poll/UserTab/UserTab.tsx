import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars-2";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

export const UserTab = ({ userList, userListLoading, userListError }: any) => {
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
            <UserListItem key={x.id} user={x} />
          ))}
      </Scrollbars>
    </Box>
  );
};

const UserListItem = ({ user }: { user: any }) => {
  return (
    <Box bg="#f2f2f2" my="2" mx={[1, 1, 3]} borderRadius="lg">
      <Flex py="4" px={[1, 1, 4]} align="center" justify="space-between">
        <Flex align="center">
          <Tooltip hasArrow placement="top" label="Follow">
            <IconButton
              icon={<AiOutlinePlusCircle size="23px" />}
              aria-label="thumbsup"
              variant="ghost"
              _focus={{ outline: "none" }}
              _hover={{ bg: "none" }}
              _active={{ bg: "none" }}
              size="sm"
              color="gray.800"
            />
          </Tooltip>
          <Box mx="3" position="relative">
            <Link href={`/Profile/${user.id}`}>
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
          <Tooltip hasArrow placement="top" label="Answers">
            <Flex align="center" minW="60px">
              <Image src="/P-10.png" w="20px" />
              <Text color="gray.600" ml="2" fontSize={["xs", "xs", "sm"]}>
                {user?.numPolls}
              </Text>
            </Flex>
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Chat messages">
            <Flex align="center" ml="6" minW="60px">
              <BsChat size="20px" />
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
