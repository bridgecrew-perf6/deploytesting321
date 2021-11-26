import { PollHistory } from "../../appTypes/appType";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
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
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import ImgPicker from "../Other/Image/ImgPicker";
import { saveImgtoCloud } from "_components/apis/imgUpload";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { updatePoll } from "lib/apollo/apolloFunctions/mutations";

import Favorite from "../Poll/PollCtrs/favorite";
import dynamic from "next/dynamic";
import Link from "next/link";
const BtnImage = dynamic(
  () => {
    return import("./AnsBox/ImageModal");
  },
  { ssr: false }
);

interface PollQuestion {
  pollData: PollHistory;
}

const PollQuestion = ({ pollData }: PollQuestion) => {
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [selectedImgs, setSelectImgs] = useState<any>([]);

  const [editQuestion, setEditQuestion] = useState<string>(pollData.question);
  const { UPDATE_POLL, HANDLE_FAVORITE } = GraphResolvers.mutations;
  const { LAST_ACTIVITY, IS_FAVORITE } = GraphResolvers.queries;

  const [editPoll, { loading: editLoading }] = useMutation(UPDATE_POLL);
  const { data } = useQuery(LAST_ACTIVITY, {
    variables: { pollId: pollData._id },
  });

  const handleUpdateQuestion = async () => {
    const imgIds: string[] | undefined = await saveImgtoCloud(selectedImgs);
    let collectiveImages;
    let editQ = {
      _id: pollData._id,
      question: editQuestion,
      pollImages: imgIds,
    };
    try {
      console.log("editQ", editQ);
      await updatePoll(editPoll, JSON.stringify(editQ));
      toast({
        title: "Poll updated successfully",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      onClose();
    } catch (err: any) {
      if (
        err.message ===
        "Content contains inappropriate language.  Please update and resubmit."
      ) {
        toast({
          title:
            "Content contains inappropriate language.  Please update and resubmit.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        return;
      }
      toast({
        title: "Error! Cannot create Poll",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const delImages = (e: string) => {
    console.log("e", e);
  };

  return (
    <Box py="10" px={[4, 4, 24, 24, 40]}>
      <Box
        bg="white"
        boxShadow="0 1px 10px -1px rgba(0,0,0,.2)"
        borderRadius="md"
      >
        <Flex justifyContent="space-between" pl="5" pt="4" pr="1">
          <Flex>
            <Link href={`/Profile/${pollData?.creator?._id}`}>
              <Avatar
                name="xav dave"
                src={pollData?.creator?.profilePic}
                border="none"
                cursor="pointer"
              />
            </Link>
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
            <Box>
              <Text fontSize={["sm", "sm", "md"]}>
                {pollData?.question && pollData.question}
              </Text>
              <Flex mt="4" align="center">
                {pollData?.pollImages?.map((x, id) => (
                  <Flex
                    key={id}
                    w="100px"
                    h="100px"
                    mr="4"
                    align="center"
                    justify="center"
                    borderWidth="1px"
                    borderColor="gray.300"
                  >
                    <BtnImage src={x} />
                  </Flex>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box>
              <Textarea
                _focus={{ borderColor: "poldit.100" }}
                onChange={(e) => setEditQuestion(e.target.value)}
                value={editQuestion}
              />
              {/* Imageg picker*/}
              <Box mt="4">
                <ImgPicker
                  selectedImgs={selectedImgs}
                  selectImgs={setSelectImgs}
                />
              </Box>
              <Flex mt="4" align="center">
                {pollData?.pollImages?.map((x, id) => (
                  <Flex
                    mr="4"
                    position="relative"
                    h="100px"
                    w="100px"
                    align="center"
                    justify="center"
                    key={id}
                    borderWidth="1px"
                    borderColor="gray.300"
                  >
                    <Image src={x} w="100%" />
                    <IconButton
                      aria-label="del-images"
                      color="red.400"
                      icon={<AiOutlineClose size="15" />}
                      size="xs"
                      position="absolute"
                      top="0"
                      right="0"
                      bg="gray.600"
                      onClick={() => delImages(x)}
                      _focus={{ outline: "none" }}
                      _hover={{ bg: "gray.600" }}
                      _active={{ bg: "gray.500" }}
                    />
                  </Flex>
                ))}
              </Flex>
              <Flex w="100%" justify="flex-end" align="center" mt="4" pr="1">
                <Button
                  bg="poldit.100"
                  color="white"
                  size="sm"
                  border="1px"
                  mr="2"
                  onClick={handleUpdateQuestion}
                  _hover={{ bg: "poldit.100", color: "white" }}
                  _focus={{ outline: "none" }}
                  isLoading={editLoading}
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
              {`Last activity: `}
              <TimeAgo date={data?.lastActivity} live={false} />
            </Text>
          </Box>
          <Favorite favId={pollData._id} favType="Poll" />
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
