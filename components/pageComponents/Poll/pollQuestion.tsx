import { PollHistory } from "../../appTypes/appType";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TimeAgo from "react-timeago";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { BiShareAlt } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";

interface PollQuestion {
  pollData: PollHistory;
}

const PollQuestion = ({ pollData }: PollQuestion) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Box py="10" px={[4, 4, 24, 24, 40]}>
      <Box
        bg="white"
        boxShadow="0 1px 10px -1px rgba(0,0,0,.2)"
        borderRadius="md"
      >
        <Flex justifyContent="space-between" pl="5" pt="4" pr="1">
          <Flex>
            <Avatar
              name="xav dave"
              src={pollData?.creator?.profilePic}
              border="none"
            />
            <Flex direction="column" justifyContent="center" pl="4">
              <Text fontSize="xs" color="gray.500">
                by {pollData?.creator?.appid}
              </Text>
              <Text fontSize="xs" color="gray.500">
                <TimeAgo date={pollData?.creationDate} live={false} />
              </Text>
            </Flex>
          </Flex>
          <HStack align="start" spacing="0">
            <Box mt="2px">
              <Tag
                fontWeight="bold"
                color="gray.500"
                size="sm"
                mr="2"
                variant="outline"
              >
                {pollData?.topic?.topic}
              </Tag>
              {pollData.subTopics &&
                pollData.subTopics.map((st) => (
                  <Tag
                    fontWeight="bold"
                    color="gray.500"
                    size="sm"
                    key={st._id}
                    mr="2"
                  >
                    {st.subTopic}
                  </Tag>
                ))}
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="dotMenu"
                icon={<BiDotsVerticalRounded size="20px" />}
                variant="ghost"
                _focus={{ outline: "none" }}
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                size="xs"
                color="gray.500"
              />
              <MenuList>
                <MenuItem
                  _focus={{ outline: "none" }}
                  _hover={{ bg: "gray.200" }}
                  onClick={onOpen}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  _focus={{ outline: "none" }}
                  _hover={{ bg: "gray.200" }}
                >
                  Report
                </MenuItem>
                <MenuItem
                  _focus={{ outline: "none" }}
                  _hover={{ bg: "gray.200" }}
                >
                  Setting
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box py="6" pl={[4, 6, 8]} mr={[6, 6, 8, 10, 16]}>
          {!isOpen ? (
            <Text fontSize={["sm", "sm", "md"]}>
              {pollData?.question && pollData.question}
            </Text>
          ) : (
            <Box>
              <Textarea
                defaultValue={pollData.question}
                _focus={{ borderColor: "poldit.100" }}
              />
              <Flex w="100%" justify="flex-end" align="center" mt="4" pr="1">
                <Button
                  bg="poldit.100"
                  color="white"
                  size="sm"
                  border="1px"
                  mr="2"
                  onClick={onClose}
                  _hover={{ bg: "poldit.100", color: "white" }}
                  _focus={{ outline: "none" }}
                  _active={{
                    bg: "white",
                    color: "poldit.100",
                    borderColor: "poldit.100",
                  }}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  colorScheme="blackAlpha"
                  onClick={onClose}
                  _focus={{ outline: "none" }}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
        <Flex justifyContent="flex-end" alignItems="center" mr="2" pb="1">
          <Box mr="2">
            <Text fontSize="xs" color="gray.400">
              Last activity: 2 days ago
            </Text>
          </Box>
          <IconButton
            aria-label="heart"
            icon={<AiOutlineHeart size="22px" />}
            bg="none"
            _hover={{ bg: "none" }}
            _focus={{ outline: "none" }}
            size="sm"
          />

          <Popover placement="top">
            <PopoverTrigger>
              <IconButton
                aria-label="heart"
                icon={<BiShareAlt size="22px" />}
                bg="none"
                _hover={{ bg: "none" }}
                _focus={{ outline: "none" }}
                size="sm"
              />
            </PopoverTrigger>
            <PopoverContent
              _focus={{ outline: "none" }}
              w="100%"
              borderRadius="lg"
            >
              <PopoverArrow />
              <PopoverBody>
                <Flex justify="flex-start" align="center" px="2" py="2">
                  <FacebookShareButton url="https://poldit.vercel.app/">
                    <FacebookIcon round={true} size="24px" />
                  </FacebookShareButton>
                  <Flex mx="4">
                    <TwitterShareButton url="https://poldit.vercel.app/">
                      <TwitterIcon round={true} size="24px" />
                    </TwitterShareButton>
                  </Flex>
                  <LinkedinShareButton url="https://chakra-ui.com">
                    <LinkedinIcon round={true} size="24px" />
                  </LinkedinShareButton>
                  <Flex ml="2">
                    <CopyToClipboard
                      text={"I'm in your clipboard Now!!!"}
                      onCopy={() => console.log("COPIED")}
                    >
                      <IoMdCopy size="24px" style={{ cursor: "pointer" }} />
                    </CopyToClipboard>
                  </Flex>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>
    </Box>
  );
};

export default PollQuestion;
