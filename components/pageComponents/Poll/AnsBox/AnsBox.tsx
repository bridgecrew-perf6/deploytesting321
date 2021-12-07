import dynamic from "next/dynamic";
import { useCallback } from "react";
import {
  Box,
  Flex,
  Select,
  HStack,
  Text,
  IconButton,
  Spinner,
  useDisclosure,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RadioGroup,
  Radio,
  Button,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import TimeAgo from "react-timeago";
import TextareaAutosize from "react-textarea-autosize";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { BiWinkSmile } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { Scrollbars } from "react-custom-scrollbars-2";
import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import Pagination from "react-js-pagination";
// import ReactPlayer from "react-player/lazy";
import "../../../../appStyles/pagination.module.css";
import { EditAnsModal } from "./EditAnsModal";
import Link from "next/link";
import MultiChoiceCard from "./MultiChoiceCard";
import { useAuth } from "_components/authProvider/authProvider";
const BtnImage = dynamic(
  () => {
    return import("./ImageModal");
  },
  { ssr: false }
);

const AnsBox = ({
  loading,
  answers,
  addAnswer,
  pollId,
  pollType,
  error,
}: any) => {
  const toast = useToast();
  const [sortBy, setSortBy] = useState<string>("rank");
  const [noOfAns, setNoOfAns] = useState<string>("5");
  const [myVote, setMyVote] = useState<string>("");
  const [ansState, setAnsState] = useState<any[]>([]);
  const [orgAns, setOrgAns] = useState<any[] | null>(null);
  const [page, setPage] = useState(1);

  const [handleLikes_disLikes] = useMutation(
    GraphResolvers.mutations.LIKE_DISLIKE_HANDLER
  );

  const [handleMultiChoice] = useMutation(
    GraphResolvers.mutations.MULTI_CHOICE_HANDLER
  );

  const auth = useAuth();

  useEffect(() => {
    const userId = auth?.authState?.getUserData?._id;
    if (pollType !== "openEnded" && userId) {
      const yourVote =
        answers?.length > 0 &&
        answers[0]?.multichoiceVotes.find((a: any) => userId === a.userId);
      setMyVote(yourVote?.vote);
    }
  }, [answers, auth]);

  useEffect(() => {
    if (answers) {
      let sortArray = [...answers];
      if (sortBy === "rank") {
        sortArray.sort((a, b) => a.rank - b.rank);
      }
      if (sortBy === "mostLiked") {
        sortArray.sort((a, b) => b.likes.length - a.likes.length);
      }
      if (sortBy === "mostDisliked") {
        sortArray.sort((a, b) => b.dislikes.length - a.dislikes.length);
      }
      if (sortBy === "newest") {
        sortArray.sort(function (a, b) {
          const aDate: any = new Date(a.creationDate);
          const bDate: any = new Date(b.creationDate);
          return bDate - aDate;
        });
      }
      setOrgAns(sortArray);
    }
  }, [answers, sortBy]);

  useEffect(() => {
    let num = Number(noOfAns) as number;
    if (orgAns) {
      const pagination = orgAns.slice(num * page - num, num * page);
      setAnsState(pagination);
    }
  }, [orgAns, page, noOfAns, sortBy]);

  const likeHandler = (
    feedback: string,
    feedbackVal: boolean,
    answerId: string
  ) => {
    handleLikes_disLikes({
      variables: {
        feedback,
        feedbackVal,
        answerId,
        pollId: pollId,
      },
    });
  };

  const multiChoiceHandler = async (id: string, answerId: string) => {
    const userId = auth?.authState?.getUserData?._id;
    const details = JSON.stringify({ id, answerId, userId });
    try {
      await handleMultiChoice({ variables: { details } });

      toast({
        title: "Answer submitted successfully",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (err: any) {
      toast({
        title: "Failed! Cannot submit answer",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const onAddAnswer = (e: any) => {
    e.preventDefault();
    let ansText = e.target.answerInput?.value;
    if (!ansText) {
      return;
    }
    addAnswer(ansText, "");
    let inputValue = document.getElementById("answerInput") as HTMLInputElement;
    inputValue.value = "";
  };

  return (
    <Box bg="white" minW="350px" boxShadow="0 1px 10px -1px rgba(0,0,0,.2)">
      {error ? (
        <Box bg="#f2f2f2" pb="6">
          <Flex minH="640px" justify="center" align="center">
            <Flex justify="center" direction="column" align="center">
              <BiErrorCircle color="#718096" size="26px" />
              <Text color="gray.500" mt="2" fontSize="sm">
                Error! Cannot load Answers.
              </Text>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box bg="white" p="10px">
          {loading ? (
            <Flex h="640px" justify="center" align="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              {pollType !== "openEnded" ? (
                <Box>
                  <Flex h="60px" align="end" justify="center" pb="10px">
                    <Text
                      fontSize="md"
                      color="gray.800"
                      fontWeight="bold"
                      align="center"
                    >
                      Select your favorite answer
                    </Text>
                  </Flex>
                  <Box py={6} px={[4, 6]} bg="#f2f2f2" rounded="6px">
                    {answers?.length > 0 &&
                      answers[0]?.multichoice?.map((x: any, id: number) => (
                        <MultiChoiceCard
                          data={x}
                          key={x._id}
                          id={id}
                          answers={answers[0]}
                          choose={multiChoiceHandler}
                          myVote={myVote}
                        />
                      ))}
                    {/* <Box mb="4" >
                    <Text
                      fontSize="md"
                      color="gray.800"
                      fontWeight="bold"
                      align="center"
                    >
                      Select your favorite answer
                    </Text>
                  </Box> */}
                    {/* <RadioGroup
                      value={ansOptions}
                      onChange={(e) => setAnsOptions(e)}
                    >
                      {answers[0]?.multichoice?.map((x: any, id: number) => (
                        <MultiChoiceCard data={x} key={x._id} id={id} />
                      ))}
                    </RadioGroup> */}
                    {/*
					  <Box mt="6" ml="2">
					  <Flex justify="center" align="center">
					  <Button
					  bg="green.500"
					  color="white"
					  size="sm"
					  _active={{ outline: "none", bg: "green.400" }}
					  _focus={{ outline: "none" }}
					  _hover={{ bg: "green.500", color: "white" }}
					  >
					  Submit Answer
					  </Button>
					  </Flex>
					  </Box>
				  */}
                  </Box>
                </Box>
              ) : (
                <>
                  <Flex
                    alignItems="center"
                    bg="white"
                    justifyContent="space-between"
                    py={4}
                    px={[4, 6]}
                  >
                    <Select
                      border="1px"
                      borderColor="#d2d2d7"
                      size="sm"
                      maxW="160px"
                      value={sortBy}
                      onChange={(val) => setSortBy(val.target.value)}
                    >
                      <option value="rank">Rank</option>
                      <option value="mostLiked">Most Liked</option>
                      <option value="mostDisliked">Most Disliked</option>
                      <option value="newest">Newest</option>
                    </Select>
                    <Text fontSize="sm" color="gray.600">
                      {answers ? `${answers.length} Answers` : "Answers"}
                    </Text>
                  </Flex>
                  <form style={{ width: "100%" }} onSubmit={onAddAnswer}>
                    <Flex
                      bg="white"
                      px="6"
                      py="4"
                      justify="center"
                      align="center"
                      borderBottom="1px"
                      borderColor="#d2d2d7"
                    >
                      <Flex
                        w={["90%", "90%", "90%"]}
                        bg="white"
                        borderRadius="2xl"
                        overflow="hidden"
                        border="1px"
                        borderColor="#d2d2d7"
                        h="100%"
                      >
                        <TextareaAutosize
                          minRows={1}
                          style={{
                            width: "100%",
                            resize: "none",
                            border: "none",
                            outline: "none",
                            padding: "12px",
                          }}
                          className="text123"
                          placeholder="Write an Answer"
                          name="answerInput"
                          id="answerInput"
                        />
                        <Box>
                          <HStack
                            align="flex-end"
                            justify="center"
                            h="100%"
                            mr="3"
                            spacing="0"
                            pb="2"
                          >
                            <IconButton
                              aria-label="addAnswer"
                              icon={<BiWinkSmile size="20px" />}
                              variant="ghost"
                              size="sm"
                              _focus={{ outline: "none" }}
                              m="0"
                            />
                            <IconButton
                              aria-label="addAnswer"
                              icon={<AiFillCamera size="20px" />}
                              variant="ghost"
                              size="sm"
                              _focus={{ outline: "none" }}
                              m="0"
                            />
                            <IconButton
                              aria-label="addAnswer"
                              icon={<RiSendPlaneFill size="20px" />}
                              size="sm"
                              variant="ghost"
                              type="submit"
                              _focus={{ outline: "none" }}
                              m="0"
                            />
                          </HStack>
                        </Box>
                      </Flex>
                    </Flex>
                  </form>
                  <Box bg="white" p="1px">
                    <Box bg="#f2f2f2" m="8px" rounded="10px">
                      {!ansState.length ? (
                        <Flex h="640px" justify="center" align="center">
                          <Text color="gray.500" fontSize="sm">
                            Add the first answer!
                          </Text>
                        </Flex>
                      ) : (
                        <Scrollbars style={{ height: "640px" }}>
                          {ansState &&
                            ansState.map((c: any) => (
                              <Box key={c._id} px={6}>
                                <CardContent
                                  data={c}
                                  likes={c?.likes?.length}
                                  dislikes={c?.dislikes?.length}
                                  likeHandler={likeHandler}
                                  pollId={pollId}
                                />
                              </Box>
                            ))}
                        </Scrollbars>
                      )}
                    </Box>
                  </Box>
                  {answers.length ? (
                    <Box
                      pt="4"
                      pb="3"
                      bg="white"
                      borderTop="1px"
                      borderColor="#d2d2d7"
                    >
                      <Flex align="center" justify="center">
                        <Pagination
                          activePage={page}
                          prevPageText="Prev"
                          nextPageText="Next"
                          itemsCountPerPage={Number(noOfAns)}
                          totalItemsCount={answers && answers.length}
                          pageRangeDisplayed={5}
                          onChange={(e: any) => setPage(e)}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </Flex>
                      <Box align="center" mt="2">
                        <Select
                          border="1px"
                          borderColor="#d2d2d7"
                          size="sm"
                          maxW="80px"
                          value={noOfAns}
                          onChange={(val) => setNoOfAns(val.target.value)}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </Select>
                      </Box>
                    </Box>
                  ) : null}
                </>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

// const MultiChoiceCard = ({ data, id }: any) => {
//   return (
//     <Box bg="white" mb="4" borderRadius="md">
//       <Text fontSize="sm" color="gray.600">
//         {data?.answerVal}
//       </Text>
//       <Flex justify="space-between" mx="5" py="1" borderTop="1px solid #d3d3d3" mt="10px">
//         <Tooltip label="Number of times selected" placement="top">
//           <Text fontSize="xs" color="gray.500">
//             2{id} votes
//           </Text>
//         </Tooltip>
//         <Text fontSize="xs" color="gray.500">
//           Rank {id + 1} of 4
//         </Text>
//       </Flex>
//     </Box>
//   );
// };

// const MultiChoiceCard = ({ data, id }: any) => {
//   return (
//     <Box bg="white" mb="4" borderRadius="md" pb="1">
//       <Radio
//         value={data?._id}
//         colorScheme="green"
//         _active={{ outline: "none" }}
//         _focus={{ outline: "none" }}
//         mb="2"
//         w="100%"
//         px="4"
//         pt="8"
//         pb="2"
//       >
//         <Box>
//           <Text fontSize="sm" color="gray.600">
//             {data?.answerVal}
//           </Text>
//         </Box>
//       </Radio>
//       <Flex justify="space-between" mx="5" py="1" borderTop="1px solid #d3d3d3">
//         <Tooltip label="Number of times selected" placement="top">
//           <Text fontSize="xs" color="gray.500">
//             2{id} votes
//           </Text>
//         </Tooltip>
//         <Text fontSize="xs" color="gray.500">
//           Rank {id + 1} of 4
//         </Text>
//       </Flex>
//     </Box>
//   );
// };

const CardContent = ({ data, likes, dislikes, likeHandler, pollId }: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const [showShortAns, setShowShortAns] = useState<boolean>(true);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const showFullAns = () => {
    setShowShortAns(!showShortAns);
    onToggle();
  };

  return (
    <Box
      bg="white"
      my="4"
      py="4"
      rounded="lg"
      boxShadow="0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%);"
    >
      <Flex w="100%" pl="3" pr="1">
        <Flex
          w="100%"
          justifyContent="space-between"
          px={1}
          pb={1}
          borderBottom="1px"
          borderColor="#d2d2d7"
          mt="2px"
        >
          <Link href={`/Profile/${data?.creator?._id}`}>
            <Text color="gray.700" fontSize="sm" cursor="pointer">
              {data.creator?.appid}
            </Text>
          </Link>
          <Text color="gray.700" fontSize="sm">
            <TimeAgo date={data?.creationDate} live={false} />
          </Text>
        </Flex>
        <Box pb="1">
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
                onClick={onEditOpen}
              >
                Edit
              </MenuItem>
              <MenuItem
                _focus={{ outline: "none" }}
                _hover={{ bg: "gray.200" }}
              >
                Report
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box pt={5} pb={1} px={5}>
        <Text fontSize="sm" noOfLines={showShortAns ? 2 : 0}>
          {data?.answer}
        </Text>
        {false && (
          <Collapse in={isOpen} animateOpacity>
            <Box p="4" textAlign="center" cursor="pointer">
              <BtnImage src="https://wallpaperaccess.com/full/215112.jpg" />
              {/*
			  <ReactPlayer
			  url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
			  height="260px"
			  width="100%"
			  controls={true}
			  />
			  */}
            </Box>
          </Collapse>
        )}
        {data?.answer.length > 160 && (
          <Text
            onClick={showFullAns}
            fontSize="xs"
            cursor="pointer"
            color="blue.400"
          >
            {isOpen ? "Show less" : "Show more"}
          </Text>
        )}
      </Box>
      <Flex justifyContent="space-between" alignItems="center" px="3">
        <Flex justifyContent="flex-start" alignItems="center">
          <Flex justifyContent="center" alignItems="center" mr={3}>
            <IconButton
              icon={<FiThumbsUp size="18px" />}
              aria-label="thumbsup"
              variant="ghost"
              _focus={{ outline: "none" }}
              size="sm"
              color="green.300"
              onClick={() => likeHandler("like", true, data._id)}
            />
            <Box>
              <Text color="gray.700" fontSize="sm">
                {likes}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <IconButton
              icon={<FiThumbsDown size="18px" />}
              aria-label="thumbsup"
              variant="ghost"
              _focus={{ outline: "none" }}
              size="sm"
              color="red.300"
              mt={1}
              onClick={() => likeHandler("dislike", true, data._id)}
            />
            <Box>
              <Text color="gray.700" fontSize="sm">
                {dislikes}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box mr="4">
          <Text color="gray.700" fontSize="sm">
            {data?.rank === "Not Ranked" ? data?.rank : `Rank ${data?.rank}`}
          </Text>
        </Box>
      </Flex>
      <EditAnsModal
        isEditOpen={isEditOpen}
        onEditClose={onEditClose}
        ansData={data}
        pollId={pollId}
      />
    </Box>
  );
};
export default AnsBox;
