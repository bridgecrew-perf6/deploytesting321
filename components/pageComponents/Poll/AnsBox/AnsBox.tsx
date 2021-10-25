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
import { BsFlagFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation } from "@apollo/client";
import Pagination from "react-js-pagination";
import { LightBoxImage } from "../../Other/LightBox/LightBoxImage";
import "../../../../appStyles/pagination.module.css";

const AnsBox = ({ loading, answers, addAnswer, poll, error }: any) => {
  const [value, setValue] = useState<string>("");
  const [noOfAns, setNoOfAns] = useState<string>("5");
  const [ansState, setAnsState] = useState([]);
  const [page, setPage] = useState(1);
  const [handleLikes_disLikes] = useMutation(
    GraphResolvers.mutations.LIKE_DISLIKE_HANDLER
  );

  useEffect(() => {
    let num = Number(noOfAns) as number;
    if (answers) {
      const pagination = answers.slice(num * page - num, num * page);
      setAnsState(pagination);
    }
  }, [answers, page, noOfAns]);

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
          value={value}
          onChange={(val) => setValue(val.target.value)}
          placeholder="Sort by"
        >
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
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
              <Flex justify="center" align="center" py="4" wrap="wrap">
                <Flex
                  flex={{ base: "0 0 100%", xl: "0 0 30%" }}
                  maxW={{ base: "100%", xl: "30%" }}
                  justify={{ base: "center", xl: "flex-start" }}
                  align="center"
                >
                  <Select
                    border="1px"
                    borderColor="#d2d2d7"
                    size="sm"
                    maxW="80px"
                    value={noOfAns}
                    onChange={(val) => setNoOfAns(val.target.value)}
                    ml={{ base: "0", xl: 8 }}
                    mb={{ base: "3", xl: 0 }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </Select>
                </Flex>
                <Flex
                  flex={{ base: "0 0 100%", xl: "0 0 70%" }}
                  maxW={{ base: "100%", xl: "70%" }}
                  justify={{ base: "center", xl: "flex-start" }}
                >
                  <Pagination
                    activePage={page}
                    prevPageText="Prev"
                    nextPageText="Next"
                    itemsCountPerPage={noOfAns}
                    totalItemsCount={answers && answers.length}
                    pageRangeDisplayed={5}
                    onChange={(e: any) => setPage(e)}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </Flex>
              </Flex>
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

  return (
    <Box
      bg="white"
      pl={[4, 4, 7]}
      pr="2"
      pb={4}
      pt={5}
      my={6}
      rounded="lg"
      boxShadow="0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%);"
    >
      <Flex w="100%">
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
      <Box pt={5} pb={1} px={2}>
        <Text fontSize={["sm", "sm", "sm"]}>{data?.answer}</Text>
      </Box>
      <Text
        onClick={onToggle}
        fontSize="xs"
        cursor="pointer"
        color="blue.400"
        pl="2"
      >
        {isOpen ? "Hide" : "Show"} attachment
      </Text>
      <Collapse in={isOpen} animateOpacity>
        <Box p="4" textAlign="center" cursor="pointer" onClick={onLbOpen}>
          <Image
            src="https://raw.githubusercontent.com/kufii/CodeSnap/master/examples/material_operator-mono.png"
            width={500}
            height={500}
            loading="lazy"
          />
        </Box>
      </Collapse>
      <Flex justifyContent="space-between" alignItems="center">
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
          <Flex justify="center" align="center">
            <IconButton
              icon={<BsFlagFill size="14px" />}
              aria-label="thumbsup"
              variant="ghost"
              _focus={{ outline: "none" }}
              size="sm"
              ml="1"
              color="gray.500"
            />
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
    </Box>
  );
};
export default AnsBox;
