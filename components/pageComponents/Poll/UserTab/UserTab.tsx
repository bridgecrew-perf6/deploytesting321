import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const picUrl =
  "http://res.cloudinary.com/rahmad12/image/upload/v1624323417/PoldIt/Users/607a4e285e6edca820460bef/profile/profilePic.jpg";
export const UserTab = () => {
  return (
    <Box bg="white">
      <Scrollbars style={{ height: "826px" }}>
        {Array.from(Array(20).keys()).map((x) => (
          <UserListItem key={x} id={x} />
        ))}
      </Scrollbars>
    </Box>
  );
};

const UserListItem = ({ id }: { id: number }) => {
  return (
    <Box bg="#f2f2f2" my="2" mx={[1, 1, 3]} borderRadius="lg">
      <Flex py="4" px={[1, 1, 4]} align="center" justify="space-around">
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
            <Avatar name="xav dave" src={picUrl} size="md" cursor="pointer" />
            <Box
              position="absolute"
              w="9px"
              h="9px"
              borderRadius="50%"
              bg={id % 2 === 0 ? "green.300" : "gray.400"}
              top="2px"
              right="3px"
            ></Box>
          </Box>
          <Box>
            <Text color="gray.600" fontSize={["sm", "sm", "md"]}>
              rahmad12 {id + 1}
            </Text>
          </Box>
        </Flex>
        <Flex align="center">
          <Tooltip hasArrow placement="top" label="Answers">
            <Flex align="center">
              <Image src="/P-10.png" w="20px" />
              <Text color="gray.600" ml="2" fontSize={["xs", "xs", "sm"]}>
                229
              </Text>
            </Flex>
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Chat messages">
            <Flex align="center" ml="6">
              <BsChat size="20px" />
              <Text color="gray.600" ml="2" fontSize={["xs", "xs", "sm"]}>
                129
              </Text>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};
