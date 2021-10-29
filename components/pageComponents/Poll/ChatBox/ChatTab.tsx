import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import TimeAgo from "react-timeago";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation, useQuery } from "@apollo/client";
import { addNewChatMssg } from "../../../../lib/apollo/apolloFunctions/mutations";
import { BiErrorCircle } from "react-icons/bi";
import { BsFlagFill } from "react-icons/bs";

const ChatTab = ({ pollId, user, addAnswer }: any) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { loading, error, data, subscribeToMore, fetchMore } = useQuery(
    GraphResolvers.queries.GET_POLL_CHAT_PAGES,
    {
      variables: { cursor: "", pollId, limit: 10 },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      console.log("CHAT3rd##", data);
      subscribeToMore({
        document: GraphResolvers.subscriptions.CHAT_SUBSCRIPTION,
        variables: { pollId },
        updateQuery: (prev, { subscriptionData }) => {
          console.log("sub_PREV*>", prev);
          console.log("sub_DATA*>", subscriptionData);
          if (!subscriptionData) return prev;
          const newChatItem = subscriptionData.data.newMessage;
          return Object.assign({}, prev, {
            messageFeedByPoll: {
              ...prev.messageFeedByPoll,
              messages: [...prev.messageFeedByPoll.messages, newChatItem],
            },
          });
        },
      });
    }
  }, [data]);

  const [addChatMssg] = useMutation(
    GraphResolvers.mutations.CREATE_CHAT_MESSAGE,
    { onError: (e) => console.log(e) }
  );

  const scrollRef = useRef();

  const onSend = (isAnswer: boolean = false) => {
    //If isAnswer is true, use Add New Answer mutation along with chat message mutation so it updates the Answer Window above.  Client way is easier than backend way which is repetitive code
    if (!userAnswer) {
      return;
    }

    const details = JSON.stringify({
      message: userAnswer,
      poll: pollId,
      isAnswer,
    });
    console.log(details);
    addNewChatMssg(addChatMssg, details, pollId);
    if (isAnswer && addAnswer) {
      addAnswer(userAnswer, []);
    }
    setUserAnswer("");
  };
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      //@ts-ignore
      scrollRef.current.scrollToBottom();
    }
  }, [scrollRef.current]);
  const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
    if (!fetchMoreResult) return previousResult;
    return {
      messageFeedByPoll: {
        ...previousResult.messageFeedByPoll,
        cursor: fetchMoreResult.messageFeedByPoll.cursor,
        hasMoreData: fetchMoreResult.messageFeedByPoll.hasMoreData,
        messages: [
          ...fetchMoreResult.messageFeedByPoll.messages,
          ...previousResult.messageFeedByPoll.messages,
        ],
      },
    };
  };
  const onScrollHandler = (e: any) => {
    if (e.target.scrollTop === 0) {
      if (data?.messageFeedByPoll?.hasMoreData) {
        fetchMore({
          variables: {
            cursor: data?.messageFeedByPoll.cursor,
          },
          updateQuery: updateQuery,
        });
      } else {
        console.log("no more data :-)");
      }
    }
    return;
  };
  if (error) {
    return (
      <Flex h="745px" justify="center" align="center">
        <Flex justify="center" direction="column" align="center">
          <BiErrorCircle color="#718096" size="26px" />
          <Text color="gray.500" mt="2" fontSize="sm">
            Error! Cannot load Chat.
          </Text>
        </Flex>
      </Flex>
    );
  }
  return (
    <Box bg="#f2f2f2">
      <Scrollbars
        style={{ height: "718px" }}
        ref={scrollRef as any}
        onScroll={onScrollHandler}
      >
        <Flex p="4" direction="column" justify="flex-end" minH="100%">
          {loading && (
            <Flex justify="center" mb="2">
              <Spinner size="md" color="poldit.100" />
            </Flex>
          )}
          {data?.messageFeedByPoll?.messages.map((d: any) =>
            user._id !== d?.creator?._id ? (
              <Flex key={d.id} my="2" justifyContent="flex-start">
                <Flex
                  alignItems="flex-start"
                  position="relative"
                  justifyContent="flex-start"
                  mr="2"
                  mt="2"
                >
                  <Tooltip label="user name" hasArrow placement="top-start">
                    <Avatar
                      name="xav dave"
                      src={d?.creator?.profilePic}
                      size="sm"
                      cursor="pointer"
                    />
                  </Tooltip>
                  <Box
                    position="absolute"
                    w="8px"
                    h="8px"
                    borderRadius="50%"
                    bg="green.300"
                    top="0"
                    right="3px"
                  ></Box>
                </Flex>
                <Flex direction="column" maxW="70%">
                  <Box
                    bg="white"
                    borderRadius="18px 18px 18px 0"
                    boxShadow="0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%);"
                    position="relative"
                    borderColor="poldit.100"
                    borderRightWidth={
                      d?.message === "Another test now" ? "1px" : "none"
                    }
                  >
                    <Text color="gray.700" fontSize={["sm", "sm", "md"]} p="4">
                      {d.message}
                    </Text>
                    {d?.message === "Another test now" && (
                      <Image
                        src="/P-10.png"
                        w="13px"
                        position="absolute"
                        top="0"
                        right="0"
                      />
                    )}
                  </Box>
                  <Flex>
                    <Text fontSize="xs" color="gray.500" ml="2" mt="1">
                      <TimeAgo date={d.creationDate} live={false} />
                    </Text>
                    <IconButton
                      icon={<BsFlagFill size="12px" />}
                      aria-label="thumbsup"
                      variant="ghost"
                      _focus={{ outline: "none" }}
                      size="xs"
                      ml="1"
                      color="gray.500"
                    />
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex key={d.id} my="2" direction="column" alignItems="flex-end">
                <Box
                  bg="gray.700"
                  maxW="70%"
                  boxShadow="0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%);"
                  borderRadius="18px 18px 0 18px"
                >
                  <Text color="white" fontSize={["sm", "sm", "md"]} p="4">
                    {d.message}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500" mr="2" mt="1">
                    <TimeAgo date={d.creationDate} live={false} />
                  </Text>
                </Box>
              </Flex>
            )
          )}
        </Flex>
      </Scrollbars>
      <Flex py="4" px={[4, 4, 8]} bg="white" borderTop="1px solid #ececec">
        <InputGroup>
          <Input
            name="msg"
            type="text"
            borderRadius="6px 0 0 6px"
            placeholder="Type message here..."
            id="msg"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            _focus={{ borderColor: "orange.400" }}
          />
          <InputRightElement
            children={
              <Tooltip label="Submit as answer" hasArrow placement="top">
                <Text
                  fontWeight="extrabold"
                  fontSize="xl"
                  color="gray.700"
                  cursor="pointer"
                  onClick={() => onSend(true)}
                >
                  A
                </Text>
              </Tooltip>
            }
          />
        </InputGroup>
        <Button
          ml="1"
          bg="gray.700"
          borderRadius="0 6px 6px 0"
          _focus={{ outline: "none" }}
          _hover={{ bg: "gray.800" }}
          onClick={() => onSend(false)}
        >
          <RiSendPlaneFill color="white" size="20px" />
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatTab;
