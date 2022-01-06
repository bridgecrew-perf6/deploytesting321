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
  Portal,
  Tag,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
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
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import ImgPicker from "../Other/Image/ImgPicker";
import { saveImgtoCloud } from "_components/apis/imgUpload";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import {
  removeImgFromPoll,
  updatePoll,
} from "lib/apollo/apolloFunctions/mutations";

import Favorite from "../Poll/PollCtrs/favorite";
import Link from "next/link";
import { useRouter } from "next/router";
import ShareBtns from "../Other/Share";

interface PollQuestion {
  pollData: PollHistory;
}

const PollQuestion = ({ pollData }: PollQuestion) => {
  const router = useRouter();
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [selectedImgs, setSelectImgs] = useState<any>([]);

  const [editQuestion, setEditQuestion] = useState<string>(pollData.question);
  const { UPDATE_POLL, HANDLE_FAVORITE, REMOVE_IMAGE } =
    GraphResolvers.mutations;
  const { LAST_ACTIVITY, IS_FAVORITE } = GraphResolvers.queries;

  const [editPoll, { loading: editLoading }] = useMutation(UPDATE_POLL);
  const { data } = useQuery(LAST_ACTIVITY, {
    variables: { pollId: pollData._id },
  });

  const [removeImg] = useMutation(REMOVE_IMAGE);

  const handleUpdateQuestion = async () => {
    const imgIds: string[] | undefined = await saveImgtoCloud(selectedImgs);
    let editQ = {
      _id: pollData._id,
      question: editQuestion,
      pollImages: imgIds,
    };
    try {
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

  const delImages = (img: string, pollId: string) => {
    const details = JSON.stringify({ _id: pollId, pollImage: img });

    removeImgFromPoll(removeImg, details);
  };

  const srch_polls_by_topic_sTopic = (data: any) => {
    router.push(
      { pathname: "/Polls", query: { data: JSON.stringify(data) } },
      "/Polls"
    );
  };

  return (
    <Box py="10" px={[4, 4, 24, 24, 40]}>
      <Box
        bg="white"
        boxShadow="0 1px 10px -1px rgba(0,0,0,.2)"
        borderRadius="lg"
        pl="6"
        pr="2"
        pt="4"
        pb="4"
      >
        <PollCardHeader
          creator={pollData?.creator}
          creationDate={pollData?.creationDate}
          onOpen={onOpen}
          isEditable={pollData?.isEditable}
          isMyPoll={pollData?.isMyPoll}
          pollId={pollData?._id}
        />
        <Box py="5" px={[0, 2, 2]} mr={[6, 6, 8, 10, 16]}>
          {!isOpen ? (
            <Box>
              <Text fontSize={["sm", "sm", "md"]}>
                {pollData?.question && pollData.question}
              </Text>
              {pollData?.pollImages.length ? (
                <Flex mt="4" align="center">
                  <PhotoProvider>
                    {pollData?.pollImages.map((x, id) => (
                      <PhotoConsumer src={x} key={id}>
                        <Box
                          key={id}
                          w="100px"
                          h="100px"
                          mr="2"
                          borderRadius="md"
                          overflow="hidden"
                        >
                          <Image
                            src={x}
                            objectFit="cover"
                            objectPosition="center center"
                            cursor="pointer"
                            h="100%"
                            w="100%"
                          />
                        </Box>
                      </PhotoConsumer>
                    ))}
                  </PhotoProvider>
                </Flex>
              ) : null}
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
                  imageLimit={3}
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
                      onClick={() => delImages(x, pollData._id)}
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
        <PollCardFooter
          lastActivity={data?.lastActivity}
          topic={pollData?.topic}
          subTopics={pollData?.subTopics}
          srch={srch_polls_by_topic_sTopic}
        />
      </Box>
    </Box>
  );
};
const PollCardHeader = ({
  creator,
  creationDate,
  pollId,
  isEditable,
  isMyPoll,
  onOpen,
}: any) => {
  return (
    <Flex justify="space-between">
      <Flex>
        <Link href={`/Profile/${creator?.appid}`}>
          <Avatar
            name="Poll Dit"
            src={creator?.profilePic}
            border="none"
            cursor="pointer"
          />
        </Link>
        <Flex direction="column" justify="center" pl="4">
          <Text fontSize="xs" color="gray.500">
            by {creator?.appid}
          </Text>
          <Text fontSize="xs" color="gray.500">
            <TimeAgo date={creationDate} live={false} />
          </Text>
        </Flex>
      </Flex>
      <HStack align="start" mt="1" pr="2">
        {!isMyPoll && <Favorite favId={pollId} favType="Poll" />}
        <Popover placement="top">
          <PopoverTrigger>
            <IconButton
              aria-label="share"
              icon={<BiShareAlt size="22px" />}
              bg="none"
              _hover={{ bg: "none" }}
              _focus={{ outline: "none" }}
              size="xs"
            />
          </PopoverTrigger>
          <ShareBtns />
        </Popover>
        <Box>
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
              {isEditable && (
                <MenuItem
                  _focus={{ outline: "none" }}
                  _hover={{ bg: "gray.200" }}
                  onClick={onOpen}
                >
                  Edit
                </MenuItem>
              )}
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
        </Box>
      </HStack>
    </Flex>
  );
};
const PollCardFooter = ({ topic, subTopics, lastActivity, srch }: any) => {
  return (
    <Flex justify="space-between" wrap="wrap" gridRowGap="2" ml={[0, 0, 1]}>
      <Flex wrap="wrap" gridGap="2">
        <Tag
          fontWeight="bold"
          color="gray.100"
          size="sm"
          borderRadius="full"
          bg="gray.400"
          onClick={() => srch(topic)}
          cursor="pointer"
        >
          {topic?.topic}
        </Tag>
        {subTopics.map((st: any) => (
          <Tag
            fontWeight="bold"
            color="gray.500"
            size="sm"
            borderRadius="full"
            key={st._id}
            onClick={() => srch(st)}
            cursor="pointer"
          >
            {st.subTopic}
          </Tag>
        ))}
      </Flex>
      <Box mr="2">
        <Text fontSize="xs" color="gray.400">
          {`Last activity: `}
          <TimeAgo date={lastActivity} live={false} />
        </Text>
      </Box>
    </Flex>
  );
};

export default PollQuestion;
