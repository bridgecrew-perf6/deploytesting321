import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import TimeAgo from "react-timeago";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useMutation, useQuery } from "@apollo/client";
import { addNewChatMssg } from "../../../../lib/apollo/apolloFunctions/mutations";
import { BiErrorCircle } from "react-icons/bi";

const ChatTab = ({ pollId, user }: any) => {
  const { loading, error, data, subscribeToMore } = useQuery(
    GraphResolvers.queries.GET_POLL_CHATS,
    { variables: { pollId } }
  );

  useEffect(() => {
    if (data) {
      subscribeToMore({
        document: GraphResolvers.subscriptions.CHAT_SUBSCRIPTION,
        variables: { pollId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const newChatItem = subscriptionData.data.newMessage;
          return Object.assign({}, prev, {
            messagesByPoll: [...prev.messagesByPoll, newChatItem],
          });
        },
      });
    }
  }, [data]);
  const [addChatMssg] = useMutation(
    GraphResolvers.mutations.CREATE_CHAT_MESSAGE,
    { onError: (e) => console.log(e) }
  );
  console.log("polId", pollId);
  console.log("user>>", user);
  const scrollRef = useRef();

  const onSend = (e: any, isAnswer: boolean = false) => {
    //If isAnswer is true, use Add New Answer mutation along with chat message mutation so it updates the Answer Window above.  Client way is easier than backend way which is repetitive code
    e.preventDefault();
    if (!e.target.msg.value) {
      return;
    }

    const details = JSON.stringify({
      message: e.target.msg.value,
      poll: pollId,
      isAnswer,
    });
    console.log(details);
    addNewChatMssg(addChatMssg, details, pollId);
    let inputValue = document.getElementById("msg") as HTMLInputElement;
    inputValue.value = "";
  };
  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      //@ts-ignore
      scrollRef.current.scrollToBottom();
    }
  }, []);
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
      {loading ? (
        <Flex h="675px" justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Scrollbars style={{ height: "675px" }} ref={scrollRef as any}>
          <Box p="4">
            {data?.messagesByPoll.map((d: any) =>
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
                    >
                      <Text
                        color="gray.700"
                        fontSize={["sm", "sm", "md"]}
                        p="4"
                      >
                        {d.message}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500" ml="2" mt="1">
                        <TimeAgo date={d.creationDate} live={false} />
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              ) : (
                <Flex
                  key={d.id}
                  my="2"
                  direction="column"
                  alignItems="flex-end"
                >
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
          </Box>
        </Scrollbars>
      )}
      <form onSubmit={(e) => onSend(e)}>
        <Flex py="4" px={[4, 4, 8]} bg="white" borderTop="1px solid #ececec">
          <Input
            name="msg"
            type="text"
            borderRadius="6px 0 0 6px"
            placeholder="Type message here..."
            id="msg"
            _focus={{ borderColor: "orange.400" }}
          />
          <Button
            ml="1"
            bg="gray.700"
            borderRadius="0 6px 6px 0"
            type="submit"
            _focus={{ outline: "none" }}
            _hover={{ bg: "gray.800" }}
          >
            <RiSendPlaneFill color="white" size="20px" />
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ChatTab;
