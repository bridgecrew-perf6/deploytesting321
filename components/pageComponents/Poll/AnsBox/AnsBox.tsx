import Image from "next/image";
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
  Progress,
  Radio,
  Button,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import TimeAgo from "react-timeago";
import TextareaAutosize from "react-textarea-autosize";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { BiWinkSmile } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import Pagination from "react-js-pagination";
import ReactPlayer from "react-player/lazy";
import { LightBoxImage } from "../../Other/LightBox/LightBoxImage";
import "../../../../appStyles/pagination.module.css";
import { EditAnsModal } from "./EditAnsModal";

const AnsBox = ({ loading, answers, addAnswer, poll, error }: any) => {
  const [sortBy, setSortBy] = useState<string>("rank");
  const [noOfAns, setNoOfAns] = useState<string>("5");
  const [ansOptions, setAnsOptions] = useState<string>("2");
  const [ansState, setAnsState] = useState<any[]>([]);
  const [orgAns, setOrgAns] = useState<any[] | null>(null);
  const [page, setPage] = useState(1);
  const [handleLikes_disLikes] = useMutation(
    GraphResolvers.mutations.LIKE_DISLIKE_HANDLER
  );

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
        pollId: poll,
      },
    });
  };

  const onAddAnswer = (e: any) => {
    e.preventDefault();
    let ansText = e.target.answerInput?.value;
    if (!ansText) {
      return;
    }
    addAnswer(ansText, []);
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
        <Box bg="#f2f2f2">
          {loading ? (
            <Flex h="640px" justify="center" align="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              {true ? (
                <Box py={6} px={[4, 6]}>
                  <Box mb="4">
                    <Text
                      fontSize="lg"
                      color="gray.800"
                      fontWeight="bold"
                      align="center"
                    >
                      Choice your Answer.
                    </Text>
                  </Box>
                  <RadioGroup
                    value={ansOptions}
                    onChange={(e) => setAnsOptions(e)}
                  >
                    {["1", "2", "3", "4", "5"].map((x, id) => (
                      <Flex pb="3" key={x}>
                        <Box bg="white" p="4" borderRadius="lg" minW="400px">
                          <Radio
                            value={x}
                            colorScheme="green"
                            _active={{ outline: "none" }}
                            _focus={{ outline: "none" }}
                            borderColor="gray.400"
                          >
                            <Box ml="2" cursor="pointer">
                              <Text fontSize="sm" color="gray.600" mb="2">
                                This is the Long sentence with will probably go
                                onto the next Line. Will it go to the next line?
                                what do u think?
                              </Text>
                              <Progress
                                value={(id + 1) * 18}
                                colorScheme="green"
                                size="sm"
                                borderRadius="sm"
                              />
                            </Box>
                          </Radio>
                        </Box>
                      </Flex>
                    ))}
                  </RadioGroup>
                  <Box mt="2" ml="2">
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
                </Box>
              ) : (
                <>
                  <Flex
                    alignItems="center"
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
                      4 Answers
                    </Text>
                  </Flex>
                  <form style={{ width: "100%" }} onSubmit={onAddAnswer}>
                    <Flex
                      bg="#f2f2f2"
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
                  <Scrollbars style={{ height: "640px" }}>
                    {ansState &&
                      ansState.map((c: any) => (
                        <Box key={c._id} px={6}>
                          <CardContent
                            data={c}
                            likes={c?.likes?.length}
                            dislikes={c?.dislikes?.length}
                            likeHandler={likeHandler}
                          />
                        </Box>
                      ))}
                  </Scrollbars>
                  <Box pt="4" pb="3">
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
                </>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

const CardContent = ({ data, likes, dislikes, likeHandler }: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: lbOpen,
    onOpen: onLbOpen,
    onClose: onLbClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

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
          <Text color="gray.700" fontSize="sm">
            {data.creator?.appid}
          </Text>
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
              <MenuItem
                _focus={{ outline: "none" }}
                _hover={{ bg: "gray.200" }}
              >
                Setting
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box pt={5} pb={1} px={5}>
        <Text fontSize={["sm", "sm", "sm"]}>{data?.answer}</Text>
        <Text
          onClick={onToggle}
          fontSize="xs"
          cursor="pointer"
          color="blue.400"
        >
          {isOpen ? "Hide" : "Show"} more
        </Text>
        <Collapse in={isOpen} animateOpacity>
          <Box p="4" textAlign="center" cursor="pointer" onClick={onLbOpen}>
            <Image
              src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png"
              width={500}
              height={500}
              loading="lazy"
            />
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
      <LightBoxImage
        url="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png"
        lbOpen={lbOpen}
        onLbClose={onLbClose}
      />
      <EditAnsModal
        isEditOpen={isEditOpen}
        onEditClose={onEditClose}
        ansData={data}
      />
    </Box>
  );
};
export default AnsBox;
