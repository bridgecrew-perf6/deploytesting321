import { useRouter } from "next/router";
import { images, data } from "../Other/NavBar/data";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import { BiShareAlt, BiMessage, BiSelectMultiple } from "react-icons/bi";
import { RiFilePaper2Line } from "react-icons/ri";
import TimeAgo from "react-timeago";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useEffect, useState } from "react";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

interface FavPollTabProps {
  userId: string | string[];
}

export const FavPollTab = ({ userId }: FavPollTabProps) => {
  const [loading, setLoading] = useState(true);

  const currentUserId = userId === "me" ? undefined : userId;

  // console.log("User Id is -->", currentUserId);

  const {
    data: favPolls,
    loading: favPollsLoading,
    updateQuery: favPollsUpdate,
  } = useQuery(GraphResolvers.queries.GET_FAVORITE_POLLS, {
    variables: {
      userId: currentUserId,
    },
    // fetchPolicy: "cache-first",
    // nextFetchPolicy: "cache-and-network",
  });

  // MyFavoritePolls will be used here from the backend
  //---------------------------------------------------
  //---------------------------------------------------
  //---------------------------------------------------
  //---------------------------------------------------
  //---------------------------------------------------

  // useEffect(() => {
  //   if (!favPollsLoading) {
  //     console.log("I got Fav Polls -->", favPolls);
  //   }
  // }, [favPollsLoading]);

  return (
    <Box mt="8">
      {favPollsLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      ) : favPolls.getFavoritePolls.length > 0 ? (
        favPolls.getFavoritePolls.map((poll: any) => (
          <PollCard
            key={poll._id}
            pollData={poll}
            favPollsUpdate={favPollsUpdate}
          />
        ))
      ) : (
        <h1> Your Favorite Polls Will Show Up Here ! </h1>
      )}
    </Box>
  );
};

const PollCard = ({ pollData, favPollsUpdate }: any) => {
  const router = useRouter();

  const [updateFavorite] = useMutation(
    GraphResolvers.mutations.HANDLE_FAVORITE
  );

  const favHandler = (favId: string) => {
    favPollsUpdate((prevFavPolls: any) => {
      const filteredFavPolls = prevFavPolls.getFavoritePolls.filter(
        (poll: any) => {
          return poll._id !== favId;
        }
      );
      return {
        getFavoritePolls: filteredFavPolls,
      };
    });

    updateFavorite({
      variables: {
        isFav: false,
        favoriteType: "Poll",
        favoriteId: favId,
      },
    });
  };

  return (
    <Box mb="8">
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
          creator={pollData.creator}
          creationDate={pollData.creationDate}
          favHandler={() => {
            favHandler(pollData._id);
          }}
        />
        <Box py="5" px={[0, 2, 2]} mr={[6, 6, 8, 10, 16]}>
          <Text
            fontSize={["sm", "sm", "md"]}
            color="gray.800"
            onClick={() => router.push("/poll")}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
            noOfLines={4}
          >
            {pollData.question}
          </Text>
          {pollData.images && (
            <Flex mt="4">
              {images.map((x, id) => (
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
                    h="100%"
                    w="100%"
                  />
                </Box>
              ))}
            </Flex>
          )}
        </Box>
        <PollCardFooter
          isMultiChoice={pollData.pollType === "multiChoice"}
          views={pollData.views}
          chatMessages={pollData.chatMssgs.length}
          answers={pollData.answers.length}
        />
      </Box>
    </Box>
  );
};

interface PollCardFooterProps {
  isMultiChoice: boolean;
  views: number;
  chatMessages: number;
  answers: number;
}

const PollCardFooter = ({
  isMultiChoice,
  views,
  chatMessages,
  answers,
}: PollCardFooterProps) => {
  const btnCommonStyle = {
    _active: { bg: "none" },
    _hover: { bg: "none" },
    _focus: { outline: "none" },
    size: "xs",
    color: "gray.500",
    bg: "none",
  };
  return (
    <Flex justify="space-between" wrap="wrap" gridRowGap="2" ml={[0, 0, 1]}>
      <Flex wrap="wrap" gridGap="2">
        <Tag
          fontWeight="bold"
          color="gray.100"
          size="sm"
          borderRadius="full"
          bg="gray.400"
        >
          Music
        </Tag>
        <Tag fontWeight="bold" color="gray.500" size="sm" borderRadius="full">
          Rap
        </Tag>
        <Tag fontWeight="bold" color="gray.500" size="sm" borderRadius="full">
          Hiphop
        </Tag>
        <Tag fontWeight="bold" color="gray.500" size="sm" borderRadius="full">
          Dubstep
        </Tag>
      </Flex>

      <Flex align="center">
        <Tooltip label="Number of Views" placement="top" hasArrow>
          <Flex justify="center" align="center" mr="4">
            <IconButton
              aria-label="heart"
              icon={<AiOutlineEye size="18px" />}
              {...btnCommonStyle}
            />
            <Text fontSize="xs" color="gray.500">
              {views}
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip label="Number of Chat Messages" placement="top" hasArrow>
          <Flex justify="center" align="center" mr="4">
            <IconButton
              aria-label="heart"
              icon={<AiOutlineMessage size="18px" />}
              {...btnCommonStyle}
            />
            <Text fontSize="xs" color="gray.500">
              {chatMessages}
            </Text>
          </Flex>
        </Tooltip>
        <Tooltip label="Number of Answers" placement="top" hasArrow>
          <Flex justify="center" align="center" mr="2">
            <IconButton
              aria-label="heart"
              icon={<BiMessage size="18px" />}
              {...btnCommonStyle}
            />
            <Text fontSize="xs" color="gray.500">
              {answers}
            </Text>
          </Flex>
        </Tooltip>
        {!isMultiChoice ? (
          <Tooltip label="Open Ended Poll" placement="top" hasArrow>
            <IconButton
              aria-label="heart"
              icon={<RiFilePaper2Line size="16px" />}
              mr="2"
              {...btnCommonStyle}
            />
          </Tooltip>
        ) : (
          <Tooltip label="Multi Choice Poll" placement="top" hasArrow>
            <IconButton
              aria-label="heart"
              icon={<BiSelectMultiple size="16px" />}
              mr="2"
              {...btnCommonStyle}
            />
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
};

interface PollCardHeaderProps {
  creator: any;
  creationDate: string;
  favHandler: any;
}

const PollCardHeader = ({
  creator,
  creationDate,
  favHandler,
}: PollCardHeaderProps) => {
  return (
    <Flex justify="space-between">
      <Flex>
        <Avatar name={creator.appid} src={creator.profilePic} border="none" />
        <Flex direction="column" justify="center" pl="4">
          <Text fontSize="xs" color="gray.500" fontWeight="bold">
            {creator.appid}
          </Text>
          <Text fontSize="xs" color="gray.500">
            <TimeAgo date={creationDate} live={false} />
          </Text>
        </Flex>
      </Flex>
      <HStack alignItems="flex-start" pr="2" mt="1">
        <IconButton
          onClick={favHandler}
          aria-label="heart"
          color="red.400"
          icon={<AiFillHeart size="22px" />}
          bg="none"
          _hover={{ bg: "none" }}
          _focus={{ outline: "none" }}
          size="xs"
        />
        <Popover placement="top">
          <PopoverTrigger>
            <IconButton
              aria-label="heart"
              icon={<BiShareAlt size="22px" />}
              bg="none"
              _hover={{ bg: "none" }}
              _focus={{ outline: "none" }}
              size="xs"
            />
          </PopoverTrigger>
          <PopoverContent
            _focus={{ outline: "none" }}
            w="100%"
            borderRadius="lg"
          >
            <PopoverArrow />
            <PopoverBody>
              <Flex justify="flex-start" align="center" px="4" py="2">
                <FacebookShareButton url="https://chakra-ui.com">
                  <FacebookIcon round={true} size="24px" />
                </FacebookShareButton>
                <Flex mx="4">
                  <TwitterShareButton url="https://chakra-ui.com">
                    <TwitterIcon round={true} size="24px" />
                  </TwitterShareButton>
                </Flex>
                <LinkedinShareButton url="https://chakra-ui.com">
                  <LinkedinIcon round={true} size="24px" />
                </LinkedinShareButton>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};
