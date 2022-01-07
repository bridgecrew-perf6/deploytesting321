import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Tooltip,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { MdGppGood } from "react-icons/md";
import { IoMdMedal } from "react-icons/io";
import { AiFillStar, AiFillCrown } from "react-icons/ai";
import { MyPollsTab } from "_components/pageComponents/ProfilePage/MyPollsTabs";
import { FollowerModal } from "_components/pageComponents/ProfilePage/FollowerModal";
import { FollowingModal } from "_components/pageComponents/ProfilePage/FollowingModal";
import { ActivityTab } from "_components/pageComponents/ProfilePage/ActivityTab";
import { FavPollTab } from "_components/pageComponents/ProfilePage/FavPollTab";
import Layout from "_components/layout/Layout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";

const Profile = ({ params }: any) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | string[]>("me");
  const [profileData, setProfileData] = useState<any>();

  const [
    getUserProfileData,
    {
      called: userProfileDataFunctionCalled,
      loading: userProfileLoading,
      data: userProfileData,
    },
  ] = useLazyQuery(GraphResolvers.queries.GET_USER_PROFILE_DATA);

  useEffect(() => {
    let fetchedId = router.query.id ?? "";
    if (fetchedId && fetchedId !== "userId") {
      setUserId(fetchedId);
    }
    //-------------------
    console.log(fetchedId);
    if (fetchedId) {
      getUserProfileData({
        variables: {
          userId: fetchedId === "userId" ? undefined : fetchedId,
        },
      });
    }

  }, []);

  useEffect(() => {
    if (userProfileData) {
      setProfileData(userProfileData?.getUserProfileData);
      // console.log("userProfileDataIs -->", userProfileData?.getUserProfileData);
    }
  }, [userProfileData]);

  return (
    <Layout pageTitle={`Profile`}>
      <Box mt="12">
        <Container maxW="container.xl">
          {profileData ? (
            <ProfileHeader userProfileData={profileData} />
          ) : (
            <Flex justify="center" align="center" minH="300px">
              <Spinner size="lg" color="poldit.100" />
            </Flex>
          )}

          <Box>
            <Box mt="10">
              <Box>
                <Tabs isFitted isLazy>
                  <TabList color="gray.400">
                    <Tab
                      _focus={{ outline: "none" }}
                      _selected={{
                        color: "poldit.100",
                        borderColor: "poldit.100",
                      }}
                    >
                      <Text zIndex="100">My Polls</Text>
                    </Tab>

                    {profileData && profileData.isMe && (
                      <>
                        {" "}
                        <Tab
                          _focus={{ outline: "none" }}
                          _selected={{
                            color: "poldit.100",
                            borderColor: "poldit.100",
                          }}
                        >
                          <Text zIndex="100">Favorites</Text>
                        </Tab>
                        <Tab
                          _focus={{ outline: "none" }}
                          _selected={{
                            color: "poldit.100",
                            borderColor: "poldit.100",
                          }}
                        >
                          <Text zIndex="100">Activity</Text>
                        </Tab>
                      </>
                    )}
                  </TabList>
                  <TabPanels>
                    <TabPanel p="0">
                      <MyPollsTab userId={userId} />
                    </TabPanel>

                    {profileData && profileData.isMe && (
                      <TabPanel p="0">
                        <FavPollTab userId={userId} />
                      </TabPanel>
                    )}

                    {profileData && profileData.isMe && (
                      <TabPanel p="0">
                        <ActivityTab />
                      </TabPanel>
                    )}
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Profile;

interface ProfileHeaderProps {
  userProfileData: any;
}

const ProfileHeader = ({ userProfileData }: ProfileHeaderProps) => {
  const expertise = ["gaming", "reactjs", "nodejs", "graphql", "vue"];
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: folowerIsOpen,
    onOpen: folowerOnOpen,
    onClose: folowerOnClose,
  } = useDisclosure();
  const {
    isOpen: folowingIsOpen,
    onOpen: folowingOnOpen,
    onClose: folowingOnClose,
  } = useDisclosure();

  const badgeStyle = {
    size: "xs",
    "aria-label": "icon-badges",
    color: "gray.600",
    bg: "none",
    _focus: { outline: "none" },
    _hover: { color: "poldit.100" },
  };
  return (
    <Flex
      direction={["column", "row"]}
      justify="center"
      align={["center", "flex-start"]}
    >
      <Box mr={[0, 10]} mb={[4, 0]}>
        <Avatar
          name="xav dave"
          src={userProfileData?.profilePic || "https://bit.ly/ryan-florence"}
          border="none"
          cursor="pointer"
          h="100%"
          w={["130px"]}
        />
      </Box>
      <Flex direction="column">
        <Flex align="center" ml="1">
          <Text fontSize="2xl" fontWeight="bold">
            {userProfileData.appid}
          </Text>
          {userProfileData.isMe ? (
            <IconButton
              aria-label="profile-setting"
              icon={<IoMdSettings size="22" />}
              size="xs"
              ml="2"
              mt="1"
              color="gray.700"
              bg="none"
              _focus={{ outline: "none", bg: "none" }}
              _hover={{ bg: "none" }}
              _active={{ bg: "none" }}
            />
          ) : (
            <></>
          )}
        </Flex>
        <Flex gridGap="1" mb="1" ml="0">
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<MdGppGood size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<IoMdMedal size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<AiFillCrown size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<AiFillStar size="18" />} {...badgeStyle} />
          </Tooltip>
        </Flex>
        <HStack mb="2" ml="1" spacing="3">
          <Box cursor="pointer" onClick={folowerOnOpen}>
            <Text fontSize="sm" _hover={{ color: "blue.400" }}>
              <Text as="span" fontWeight="bold">
                182
              </Text>{" "}
              Followers
            </Text>
          </Box>
          <Box cursor="pointer" onClick={folowingOnOpen}>
            <Text fontSize="sm" _hover={{ color: "blue.400" }}>
              <Text as="span" fontWeight="bold">
                {userProfileData?.following?.length || 0}
              </Text>{" "}
              Following
            </Text>
          </Box>
        </HStack>
        <Flex gridGap="2" mb="2" wrap="wrap">
          {expertise.map((x, id) => (
            <Tag
              fontWeight="bold"
              color="gray.500"
              _hover={{ color: "gray.100", bg: "gray.400" }}
              size="sm"
              borderRadius="full"
              key={id}
            >
              {x}
            </Tag>
          ))}
        </Flex>
        <Box ml="1">
          <Text
            color="gray.600"
            fontSize="sm"
            maxW="600px"
            noOfLines={isOpen ? 0 : 2}
          >
            {userProfileData.bio}
          </Text>
          <Text
            as="span"
            color="blue.400"
            fontSize="xs"
            onClick={onToggle}
            cursor="pointer"
          >
            show {isOpen ? "less" : "more"}
          </Text>
        </Box>
      </Flex>
      <FollowerModal isOpen={folowerIsOpen} onClose={folowerOnClose} />
      <FollowingModal isOpen={folowingIsOpen} onClose={folowingOnClose} />
    </Flex>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}
